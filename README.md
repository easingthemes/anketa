# anketa
Headless browser nodejs script

## Requirement
NodeJs v8+

## Usage (without install)
```
npx @draganfilipovic/anketa ne
```

## Install
```
npm i @draganfilipovic/anketa -g
```

## Run
```
anketa ne
```

## How to use
Usage: `anketa <vote> [options]`

Options:
```
  -V, --version              output the version number
  -u, --url [url]            Page url (default: "https://vozdovac.rs/anketa")
  -v, --votes [votes]        Number of votes, default 12 (default: 12)
  -t, --timeout [timeout]    Time to wait after page load, default 10, in seconds (default: 10)
  -r, --response [response]  Time to wait for form response, default 10, in seconds (default: 10)
  -l, --limit [limit]        Limit number of browsers to open at once, default 10 (default: 10)
  -c, --cookie [cookie]      Name of the cookie, default `tpc_1539354118305` (default: "tpc_1539354118305")
  -h, --headless [headless]  is browser headless, default true (default: true)
  -h, --help                 output usage information
```

###The only required param is `vote`.

