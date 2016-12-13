chrome.storage.sync.get({
    match: 'https://example.com',
    replace: 'http://127.0.0.1:80'
}, items => {

    const { match, replace } = items

    chrome.webRequest.onHeadersReceived.addListener(
        info => {
            const redirectUrl = info.url.replace(match, replace)
            console.log(`redirecting to: ${redirectUrl}`)

            return { redirectUrl }
        },
        {
            urls: [ `${match}/*` ]
        },
        ["blocking","responseHeaders"]
    )

    chrome.webRequest.onHeadersReceived.addListener(
        info => {
            info.responseHeaders.push(
                { name: 'Access-Control-Allow-Origin', value: '*' }
            )
            const responseHeaders = info.responseHeaders

            return { responseHeaders }
        },
        {
            urls: [ `${replace}/*` ]
        },
        ["blocking","responseHeaders"]
    )
})

