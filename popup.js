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
                Object.keys(logs).map(path => `<li>${path.replace(/\?.*/,'')}</li>`).join('')
        }

        chrome.storage.sync.get('logs', ({ logs }) => writeLogs(logs[tabId]))

        chrome.storage.onChanged.addListener(function(changes) {
            const logs = changes.logs.newValue
            writeLogs(logs[tabId])
        })
    })

})
