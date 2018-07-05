'use strict'

var buildType = process.argv.slice(2)[0]
console.log('-----start build-----  ' + buildType)
var obj = {
  NODE_ENV: '"production"'
}

switch (buildType) {
  case 'prod':
    obj.BASE_URL = '"http://192.168.0.116:10088"';
    obj.WEB_SOCKET_URL = '"http://192.168.0.116:10088"';
    break;
  case 'test':
    obj.BASE_URL = '"http://192.168.0.116:10087"';
    obj.WEB_SOCKET_URL = '"http://192.168.0.116:10087"';
    break;
  default:
    obj.BASE_URL = '"http://192.168.0.116:10088"';
    obj.WEB_SOCKET_URL = '"http://192.168.0.116:10088"';
    break;
}
module.exports = obj;
