### Rx-log

Just:
```javascript
const Rx = require('rx-log')()

Rx.Observable.timer(0, 1000)
  .log('timer$') // also .warn, .info
```

Instead of:
```javascript
const Rx = require('rx')

Rx.Observable.timer(0, 1000)
  .do(val => console.log('timer$', val)) 
```