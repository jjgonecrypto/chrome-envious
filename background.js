const localhost = 'http://127.0.0.1:8080/static'
const remote = 'https://cloud-dev.mongodb.com/static'

chrome.webRequest.onHeadersReceived.addListener(
    function(info) {
        const redirectUrl = info.url.replace(remote, localhost)
        console.log(`redirecting to: ${redirectUrl}`)

        return { redirectUrl }
    },
    {
        urls: [ `${remote}/*` ]
    },
    ["blocking","responseHeaders"]
)

chrome.webRequest.onHeadersReceived.addListener(
    function(info) {
        info.responseHeaders.push(
            { name: 'Access-Control-Allow-Origin', value: '*' }
        )
        const responseHeaders = info.responseHeaders

        return { responseHeaders }
    },
    {
        urls: [ `${localhost}/*` ]
    },
    ["blocking","responseHeaders"]
)
