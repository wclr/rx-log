var enabled = true

var attachLog = function (rx) {
  var output = function(method, message, mapFn){
      return this.map(function(val){
        if (enabled){
          console[method](message, mapFn ? mapFn(val) : val)
        }
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

var rxLog = {
  attach: attachLog,
  enable: function(){
    rxLog.enabled(true)
  },
  enabled: function(state){
    enabled = state
  },
  disable: function(){
    rxLog.enabled(false)
  }
}

var g =
  typeof global === "object" ? global :
    typeof window === "object" ? window :
      typeof self === "object" ? self : this;

g.rxLog = rxLog

module.exports = rxLog
