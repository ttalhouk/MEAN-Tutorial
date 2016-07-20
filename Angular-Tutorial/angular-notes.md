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

## Piping Expressions through Filters

If we wanted the price value to have a currency with 2 decimals, we could apply the currency value using pipe:

`<h2>{{product.price | currency}}</h2>`

currency will send product.price through the currency filter and localize the currency symbol and decimals.

**Filter Format**

`value | filter:options`

## Forms and Models

Updating fields real time
```html
<form name="reviewForm">
  <blockquote>
    <b>Stars: {{review.stars}}</b>
    </br>
    {{review.body}}
    </br>
    <cite>- {{review.author}}</cite>
  </blockquote>

  <select ng-model="review.stars">
    <option value="1">1 star</option>
    <option value="2">2 stars</option>
    <option value="3">3 stars</option>
    <option value="4">4 stars</option>
    <option value="5">5 stars</option>
  </select>
  <textarea ng-model="review.body"></textarea>
  <label>by:</label>
  <input type="email" ng-model="review.author"/>
  <input type="submit" value="Submit">
</form>

```





**List of Directives**

* `ng-app="[app name]"` - sets app module to page
* `ng-controller="[controller name] as [alias]"` - sets controller to the section under the alias
* `ng-show/hide="[controller.expression]"` - sets visibility based on expression
* `ng-repeat="[object singular] in [controller.objectsArray]"` - repeats section for each object in the array  
* `ng-src="{{expression}}"` -  used to load entire expression
* `ng-click="[var] = value"` - useful for adding values to tabs or links
* `ng-init="[var] = value"` - sets initial value for variable.  Useful for prototyping but should be done in controller.
* `ng-class="{[className]:[condition]}"` -  if condition is true set the class to the element
* `ng-model` - binds field with tag

**List of Filters**

* `currency` - formats value into local currency
* `date:'MM/dd/yyyy @ h:mm'` - formats date
* `uppercase/lowercase` - converts to all uppercase or lowercase
* `limitTo:#` - limits characters in a string or items in an array
* `orderBy: '(-)(key)'` - orders list by key value '-' is desc no '-' is asc
