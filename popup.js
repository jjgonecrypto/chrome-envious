document.addEventListener('DOMContentLoaded', () => {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        match: 'https://example.com',
        replace: 'http://127.0.0.1:80'
    }, items => {
        document.querySelector('var.js-match').innerHTML = items.match
        document.querySelector('var.js-replace').innerHTML = items.replace
    })

    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        const tabId = tabs[0].id

        const writeLogs = logs => {
            document.querySelector('ul').innerHTML =
                Object.keys(logs)
                    .sort((a,b) => logs[a.order] > logs[b.order])
                    .map(path => `<li>${path.replace(/\?.*/,'')}</li>`)
                    .join('')
        }

        chrome.storage.sync.get('logs', ({ logs }) => writeLogs(logs[tabId]))

        const toggleState = (enabled) => {
            document.querySelector('button[name=toggle]').innerHTML = enabled ? 'Pause' : 'Resume'
            document.querySelector('h1').innerText = `Envious is ${enabled ? 'Running' : 'Paused'}`
            if (!enabled) document.body.classList.add('disabled')
            else document.body.classList.remove('disabled')
        }

        document.querySelector('button[name=toggle]').addEventListener('click', () => {
            chrome.storage.sync.get('enabled', ({ enabled = true }) => {
                toggleState(!enabled)
                chrome.storage.sync.set({ enabled: !enabled }, () => {
                    chrome.tabs.reload(tabId)
                    chrome.runtime.reload()
                })

            })
        })

        chrome.storage.sync.get('enabled', ({ enabled = true }) => {
            toggleState(enabled)
        })

        chrome.storage.onChanged.addListener(function(changes) {
            if (changes.logs) {
                const logs = changes.logs.newValue
                writeLogs(logs[tabId])
            }
        })
    })

})
