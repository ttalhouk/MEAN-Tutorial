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
Set up the app name as a directive in the html tag to load upon page load.
```html
<html ng-app="store">
```

This allows for expressions to be used in the HTML file.

**Expressions**

```html
<p>
  I am {{4+6}}
</p>

// this will evaluate to <p>I am 10</p>
```

## Controllers

*Working with Data*  
Controllers determine what needs to run to update the site.  They are written in the app.js file like so.
```javascript
(function(){ // wrap the app in a closure
  var app = angular.module('store',[]);

  app.controller('storeController', function(){
  });
})();
```
Here is a javascript object
```javascript
var gem = {
  name: 'dodecahedron',
  price: 2.95,
  description: "10 sided"
}

// assign it to the controller under this.product
app.controller('storeController', function(){
  this.product = gem;
});
```
It can now be used in the HTML where the controller is set, such as...
```html
<body ng-controller="storeController as store">
  <h1>{{store.product.name}}</h1>
  <h2>${{store.product.price}}</h2>
  <p>{{store.product.description}}</p>    
</body>
```

## Built in Directives

**Adding a Button**

Adding a new value to the gem object

```javascript
var gem = {
  name: 'dodecahedron',
  price: 2.95,
  description: "10 sided",
  canPurchase: false
}
```
If we want a button "add to cart" to show up if canPurchase is true using `ng-show` expression...
```html
<body ng-controller="storeController as store">
  <div ng-show="!store.product.soldOut">
    <h1>{{store.product.name}}</h1>
    <h2>${{store.product.price}}</h2>
    <p>{{store.product.description}}</p>  
    <button ng-show="store.product.canPurchase">Add to Cart</button>  
  </div>
</body>
```
alternatively we could use `<div ng-hide="store.product.soldOut">` which would hide if true.

**Multiple Object Directive**

`ng-repeat` can be used for an array of objects.  The formating is as follows: `ng-repeat=" [object] in [controller].[object(s)]"`  

so in the store example if there were multiple gems
```javascript
// app.js
app.controller('storeController', function(){
  this.products = gems;
});
var gems = [{...},{...}]
```
```html
<body ng-controller="storeController as store">
  <div ng-repeat="product in store.products">
    <div ng-show="!product.soldOut">
      <h1>{{product.name}}</h1>
      <h2>${{product.price}}</h2>
      <p>{{product.description}}</p>  
      <button ng-show="store.product.canPurchase">Add to Cart</button>  
    </div>
  </div>
</body>
```
