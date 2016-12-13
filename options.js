document.addEventListener('DOMContentLoaded', () => {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        match: 'https://example.com',
        replace: 'http://127.0.0.1:80'
    }, items => {
        document.querySelector('input[name=match]').value = items.match
        document.querySelector('input[name=replace]').value = items.replace
    })

    const getInput = name => document.querySelector(`input[name=${name}]`).value

    document.querySelector('button[name=save]').addEventListener('click', () => {
        chrome.storage.sync.set({
            match: getInput('match'),
            replace: getInput('replace')
        }, () => {
            // Update status to let user know options were saved.
            const status = document.querySelector('.status')
            status.textContent = 'Options saved.'
            setTimeout(() => {
                status.textContent = ''
            }, 750)
        })
    })
})
