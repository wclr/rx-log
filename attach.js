var enabled = true

var methods = ['log', 'warn', 'info']

var getTime = function (time) {
  var addZero = function (x) {
    return (x < 9 ? '0' : '') + x
  }
  var addZero2 = function (x) {
    return (x < 100 ? '0' : '') + addZero(x)
  }
  var h = time.getHours()
  var m = time.getMinutes()
  var s = time.getSeconds()
  var ms = time.getMilliseconds()
  return [h, m, s].map(addZero).join(':') + '.' + addZero2(ms)
}

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
        args.unshift('[rx-log] ' + getTime(new Date()) + ' -')
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