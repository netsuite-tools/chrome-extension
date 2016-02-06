# NetSuite Developer Tools

## Features

#### Debugger

Extending __Evaluate Expressions__ input element in the Script Debugger

- History via `SHIFT` + `ARROW UP` / `ARROW DOWN` (like bash history)
- NetSuite API autocompletion with arguments and API Doc via tooltips
- Injecting a button which copies the cookie for RESTlet scripts into the clipboard

### Clear History
Just run this in your browser console:

```
localStorage.removeItem('debugger-history')
```
