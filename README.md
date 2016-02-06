# NetSuite Developer Tools

# Installation

Download the __crx__ file on [the release page](https://github.com/netsuite-devtools/chrome-web-extensions/releases).

Then open`chrome://extensions/` in
your Chrome browser and drag the __crx__ file into the page.

## Features

#### Debugger

Extending __Evaluate Expressions__ input element in the Script Debugger

- History via `SHIFT` + `ARROW UP` / `ARROW DOWN` (like bash history)
- NetSuite API autocompletion with arguments and API Doc via tooltips
- Injecting a button which copies the cookie for RESTlet scripts into the clipboard

###### Clear History
Just run this in your browser console:

```
localStorage.removeItem('debugger-history')
```

###### Demo Screencast
[![Demo](http://img.youtube.com/vi/1x8QxyyGy_c/0.jpg)](https://www.youtube.com/watch?v=1x8QxyyGy_c)
