# Chrome Envious
Replace matching URL requests from one domain to another. Useful when you want to run local JS and CSS against a deployed environment.

![](https://media.giphy.com/media/C0Q6ghc3txKus/giphy.gif)

## Installation
1. Clone this repo (git clone)
1. Open Chrome [extensions](chrome://extensions/) (`chrome://extensions/`)
1. Enable `Developer Mode` (top right checkbox)
1. Click `Load unpacked extension`
1. Chose the cloned repo

## Configuration
1. Click **Options** to set the match and replace prefixes ![env-control](https://cloud.githubusercontent.com/assets/799038/22305816/efc97280-e30a-11e6-9633-e31fd3bed93e.gif)

## Gotchas
If you need to mix content - i.e. replace HTTPS requests with HTTP ones - then you will need to explicitly allow this in Chrome. Click the icon below and then "Load unsafe scripts" ![help](https://cloud.githubusercontent.com/assets/799038/22305895/2af19e78-e30b-11e6-9101-2d82a065a988.png)

## Changelog
- `1.1` Fixed issue where scripts loaded via ajax (XHR) would result in Chrome issuing `Request header field X-Requested-With is not allowed by Access-Control-Allow-Headers in preflight response`
