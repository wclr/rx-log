var Rx = require('rx')

var attachLog = function(rx){
  rx = rx || Rx
  var output = function(method, message, mapFn){
      return this.map(function(val){
        console[method](message, mapFn ? mapFn(val) : val)
        return val
      })
    }

    ;['log', 'warn', 'info'].forEach(function(type){
    rx.Observable.prototype[type] = function(message, mapFn){
      return output.apply(this, [type, message || '', mapFn])
    }
  })

  return rx
}

attachLog(Rx)

module.exports = attachLog