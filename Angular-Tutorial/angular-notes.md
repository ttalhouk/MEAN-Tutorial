## Angular

Angular is a front end frame work for organizing js and writing reactive websites.  It allows for HTML to call upon js using directives such as this example.

```HTML
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body ng-controller="storeController">

  </body>
</html>
```
will call the JS function
```javascript
function storeController(){
  alert('welcome')
}
```
To run an angular app we will need the following downloads.

[Angular]: http://angularjs.org - angular.min.js  
[Bootstrap]: http://getbootstrap.com - bootstrap.min.css

**Modules**

Anular keeps js files in modules which makes code for maintainable and readable.  It is also where dependencies are defined.  

```javascript
var app = angular.module('store',[])
// format
// var (name) = angular.module('(app name)', [(dependencies)])
```
