var enabled = true

var methods = ['log', 'warn', 'info']

var attachLog = function(to){
  var output = function(method, message, mapFn){
    return this.do(function(val){
      if (enabled){
        var args = []
        if (typeof message === 'function'){
          mapFn = message
        } else {
          args.push(message)
        }
        args.push(mapFn ? mapFn(val) : val)
        console[method].apply(console, args)
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

attachToRx.enable = function(){
  enabled = true
}
attachToRx.disable = function(){
  enabled = false
}


module.exports = attachToRx