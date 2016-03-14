# JsonRpc
[![Build Status](https://travis-ci.org/etk-pl/jsonrpc.svg?branch=master)](https://travis-ci.org/etk-pl/jsonrpc)
## Schema
```javascript
{
	"version" : String,
	"id" : Integer,
	"resource" : String,
	"method" : String,
	"params" : Object,
	"result" : *,
	"error" : {
		"code" : Integer,
		"message" : String
	}
}
```
## Usage
### New request
```javascript
var jsonrpc = require('@etk/jsonrpc');
var request = new jsonrpc.Request();
request.setResource('someResource').setMethod('methodName').setParams({'param1' : 'paramValue'});
console.log(request.toString());
// {"version":"0.1.0","id":1,"resource" : "someResource","method":"methodName","params":{"param1":"paramValue"}}
```
equals to
```javascript
var jsonrpc = require('@etk/jsonrpc');
var request = new jsonrpc.Request({
	resource : 'someResource',
	method : 'methodName',
	params : {param1 : 'paramValue'}
});
console.log(request.toString());
// {"version":"0.1.0","id":1,"resource" : "someResource","method":"methodName","params":{"param1":"paramValue"}}
```
### New response
#### with result
```javascript
var jsonrpc = require('@etk/jsonrpc');
var response = new jsonrpc.Response();
response.setId(1).setResult('someResult');
console.log(response.toString());
// {"version":"0.1.0","id":1,"result":"someResult"}
```
equals to
```javascript
var jsonrpc = require('@etk/jsonrpc');
var request = new jsonrpc.Request({
	id : 1,
	result : 'someResult'
});
console.log(request.toString());
// {"version":"0.1.0","id":1,"result":"someResult"}
```
#### with error
```javascript
var jsonrpc = require('@etk/jsonrpc');
var response = new jsonrpc.Response({
	id : 1,
	error : {
		code : 1,
		message : 'Error message'
	}
});
console.log(response.toString());
// {"version":"0.1.0","id":1,"error":{"code":1,"message":"Error message"}}
```
equals to
```javascript
var jsonrpc = require('@etk/jsonrpc');
var response = new jsonrpc.Response({
	id : 1,
	error : {
		code : 1,
		message : 'Error message'
	}
});
console.log(response.toString());
// {"version":"0.1.0","id":1,"error":{"code":1,"message":"Error message"}}
```
equals to
```javascript
var jsonrpc = require('@etk/jsonrpc');
var response = new jsonrpc.Response({
	id : 1,
	error : {
		code : 1,
		message : 'Error message'
	}
});
console.log(response.toString());
// {"version":"0.1.0","id":1,"error":{"code":1,"message":"Error message"}}
```
### New notification
```javascript
var jsonrpc = require('@etk/jsonrpc');
var notification = new jsonrpc.Notification();
notification.setResource('someResource').setMethod('methodName').setParams({'param1' : 'paramValue'});
console.log(notification.toString());
// {"version":"0.1.0","resource" : "someResource","method":"methodName","params":{"param1":"paramValue"}}
```
equals to
```javascript
var jsonrpc = require('@etk/jsonrpc');
var notification = new jsonrpc.Notification({
	resource : 'someResource',
	method : 'methodName',
	params : {param1 : 'paramValue'}
});
console.log(notification.toString());
// {"version":"0.1.0","resource" : "someResource","method":"methodName","params":{"param1":"paramValue"}}
```
### Parse message
```javascript
var jsonrpc = require('@etk/jsonrpc');
var notification = jsonrpc.parse('{"version":"0.1.0","resource" : "someResource","method":"methodName","params":{"param1":"paramValue"}}');
console.log(notification.toString());
// {"version":"0.1.0","resource" : "someResource","method":"methodName","params":{"param1":"paramValue"}}
var notification = jsonrpc.parse({
	"version" : "0.1.0",
	"resource" : "someResource",
	"method" : "methodName",
	"params" : {"param1" : "paramValue"}
});
console.log(notification.toString());
// {"version":"0.1.0","resource" : "someResource","method":"methodName","params":{"param1":"paramValue"}}
```
### JSONLess
JSONLess allows non-primitives values like ```Date``` or MongoDB ```ObjectID``` to be transfered over JSON
See [JSONLess github.io pages](http://ponury-kostek.github.io/json-less/) for mor info 
## Docs
See [github.io pages](http://etk-pl.github.io/jsonrpc/) 