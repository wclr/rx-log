# Rx-log

A shortcut for debug console output of [rx.js](https://github.com/Reactive-Extensions/RxJS) streams.  
Read this article [How to debug RxJS code](http://staltz.com/how-to-debug-rxjs-code.html)

Usage:
```javascript
Rx.Observable.timer(0, 1000)
  .log('timer$')
```
Instead of:
```javascript
Rx.Observable.timer(0, 1000)
  .do(val => console.log('timer$', val)) 
```

You may also do use `.warn` and `.info` methods:
```javascript
  const Rx = require('rx')
  require('rx-log')
  
  Rx.Observable.timer(0, 1000)
    .info((x) => `timer$ value is ${x}`)
    
  Rx.Observable.timer(0, 1000)
      .warn('timer$ value', (x) => `${x} ms`)
```
  
## Why to use it?
Just makes you write and debug code faster. 