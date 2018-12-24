# anketa
Headless browser nodejs script

## Requirement
NodeJs v8+

How to install -> https://nodejs.org/en/download/


## Info
During first install additional time is needed in order to download Chromium.

If you use it without install (with npx), Chromium will be downloaded each time.

If you see a lot of errors when opening a page:
```
ERROR: opening page ... 14
```
Page is probably broken, so there is no response. Please stop script manually:
```
CTRL + c
```

## Install
```
npm i @draganfilipovic/anketa -g
```

## Run
```
anketa ne -u https://example.com/anketa
```

## With params
- Add 10000 votes
```
anketa ne -u https://example.com/anketa -v 10000
```

- Speed up, increase simultaneous browsers.
```
anketa ne -u https://example.com/anketa -v 10000 -l 40
```

## Usage (without install)
```
npx @draganfilipovic/anketa ne -u https://example.com/anketa
```

## How to use
Usage: `anketa <vote> [options]`

Options:
```
  -V, --version              output the version number
  -u, --url <url>            Page url (required)
  -v, --votes [votes]        Number of votes, default 12 (default: 12)
  -t, --timeout [timeout]    Time to wait after page load, default 10, in seconds (default: 10)
  -r, --response [response]  Time to wait for form response, default 10, in seconds (default: 10)
  -l, --limit [limit]        Limit number of browsers to open at once, default 10 (default: 10)
  -c, --cookie [cookie]      Name of the cookie, default `tpc_1539354118305` (default: "tpc_1539354118305")
  -h, --headless [headless]  is browser headless, default true (default: true)
  -h, --help                 output usage information
```

###The only required params are `vote` and `-u <url>`.

