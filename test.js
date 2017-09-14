var ffi = require('ffi');
var path = require('path');

 var iopath = path.join(__dirname, '/dll/patentimagematch.dll');

 console.log('iopath:', iopath);

var d = ffi.Library(iopath,{'DllJudgeImageisColor':['int32',['string']]});

var colour = d.DllJudgeImageisColor("d:\\image.jpg");

console.log('colour:', colour);