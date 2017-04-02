document.addEventListener('DOMContentLoaded', () => {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        match: 'https://example.com',
        replace: 'http://127.0.0.1:80'
    }, items => {
        document.querySelector('var.js-match').innerHTML = items.match
        document.querySelector('var.js-replace').innerHTML = items.replace
    })
})
