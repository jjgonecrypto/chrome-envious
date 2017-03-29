chrome.storage.sync.get({
    match: 'https://example.com',
    replace: 'http://127.0.0.1:80'
}, items => {

    const { match, replace } = items

    // redirect requests for matching URLs
    chrome.webRequest.onHeadersReceived.addListener(
        info => {
            // show page action icon
            chrome.pageAction.show(info.tabId)

            const redirectUrl = info.url.replace(match, replace)

            return {
                redirectUrl
            }
        },
        {
            urls: [ `${match}/*` ]
        },
        ['blocking','responseHeaders']
    )

    // ensure all requests to target domain have an open CORS response
    // header and allow-headers for x-requested-with for XHR requests
    chrome.webRequest.onHeadersReceived.addListener(
        info => {
            const responseHeaders = info.responseHeaders

            responseHeaders.push(
                { name: 'Access-Control-Allow-Origin', value: '*' },
                { name: 'Access-Control-Allow-Headers', value: 'Origin, X-Requested-With, Content-Type, Accept' }
            )

            return { responseHeaders }
        },
        {
            urls: [ `${replace}/*` ]
        },
        ['blocking','responseHeaders']
    )
})

