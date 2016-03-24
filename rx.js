var Rx = require('rx')
var rxLog = require('./index')

rxLog.attachToRx(Rx)

module.exports = Rx