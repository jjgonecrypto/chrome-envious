chrome.storage.sync.get({
    match: 'https://example.com',
    replace: 'http://127.0.0.1:80'
}, items => {

    const { match, replace } = items

    chrome.webRequest.onHeadersReceived.addListener(
        info => {
            const redirectUrl = info.url.replace(match, replace)

            return { redirectUrl }
        },
        {
            urls: [ `${match}/*` ]
        },
        ["blocking","responseHeaders"]
    )

    chrome.webRequest.onHeadersReceived.addListener(
        info => {
            const responseHeaders = info.responseHeaders

            responseHeaders.push(
                { name: 'Access-Control-Allow-Origin', value: '*' }
            )

            return { responseHeaders }
        },
        {
            urls: [ `${replace}/*` ]
        },
        ["blocking","responseHeaders"]
    )
})

