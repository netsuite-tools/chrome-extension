# NetSuite Developer Tools

# Installation

Download the latest version of this extension here: __[dist.crx](https://github.com/netsuite-devtools/chrome-web-extensions/raw/master/dist.crx)__

Then open `chrome://extensions/` in
your Chrome browser and drag the __crx__ file from your downloads directory into the chrome extensions page.

## Features

#### Freemarker to WYSIWYG Injector

- Providing a button next to the template select box to put (like in the preview)
the HTML result into the WYSIWYG editor.

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


## Development

```
npm i
npm run bundle
```
