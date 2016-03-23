var enabled = true

var methods = ['log', 'warn', 'info']

var attachLog = function(to){
  var output = function(method, message, mapFn){
    return this.map(function(val){
      if (enabled){
        console[method](message, mapFn ? mapFn(val) : val)
      }
      return val
    })
  }
  to && methods.forEach(function(type){
    to.prototype[type] = function(message, mapFn){
      return output.apply(this, [type, message || '', mapFn])
    }
  })
}

var attachToRx = function (rx) {
  attachLog(rx.Observable)
  attachLog(rx.Subject)
  return rx
}

var rxLog = {
  attachLog: attachLog,
  attachToRx: attachToRx,
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
