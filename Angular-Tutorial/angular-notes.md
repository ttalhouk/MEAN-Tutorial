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

**Accepting Submissions**

Start off creating a controller for the review form and use `ng-submit` to capture the form information.

```html
<form name="reviewForm" ng-controller="reviewController as reviewCtrl" ng-submit="reviewCtrl.addReview(product)">
```
Update app.js to add the controller and submit function.
```javascript
app.controller('reviewController', function(){
  this.review = {};
  this.addReview = function(product){
    product.reviews.push(this.review);
    // this.review is the context from the function call
  };
});
```
Next we need to clear the form fields. To do this set this.review to an empty object after the review is pushed onto the array.
```javascript
app.controller('reviewController', function(){
  this.review = {};
  this.addReview = function(product){
    product.reviews.push(this.review);
    this.review = {}; // resets the form
  };
});
```

**Form Validations**  
First turn off default valdiations using `novalidate` and add `required` to the fields that are required.

To check it is validating correctly you can add...
```html
<div>
  reviewForm is {{reviewForm.$valid}}
</div>
```
Which will print the Validity.  This is because reviewForm is the form name, and `$valid` is a built in property we are calling on it.

We can use this to disable the submit until the form is valid like so...
```html
<div>
<form name="reviewForm" ng-controller="reviewController as reviewCtrl" ng-submit="reviewForm.$valid && reviewCtrl.addReview(product)" novalidate>
</div>
```
Can add CSS to borders to help show if valid or not using angular classes.
```CSS
.ng-invalid.ng-dirty{
  border-color: red;
}
.ng-valid.ng-dirty{
  border-color: green;
}
```

## Directives

**HTML snippits**

You can move repeated lines of html into snippits/partials
```html
<!-- product-title.html  snippit-->
{{product.name}}
<em class="pull-right">{{product.price | currency}}</em>
```
Then use `ng-include` to bring the snippit in
```html
<h3 ng-include="'product-title.html'">          <!-- pulled out into product-title.html snippit{{product.name}}
  <em class="pull-right">{{product.price | currency}}</em>-->

</h3>
```

This can also be achieved using custom directives.  
```html
<product-title></product-title>
```
This needs to be defined in app.js
```javascript
app.directive('productTitle',function(){
  return{
    restrict: 'E', // defines type of directive "E" element
    templateUrl: 'product-title.html'
  };
});
```
There are also attribute directives that can be applied to elements and call on the template, which looks like this.

```html
<h3 product-title></h3>
<!-- wraps product-title in the h3 tag -->
```
This needs to be defined in app.js
```javascript
app.directive('productTitle',function(){
  return{
    restrict: 'A', // defines type of directive "A" attribute
    templateUrl: 'product-title.html'
  };
});
```
**Directive Controllers**

Contollers can be defined within the directive
```javascript
app.directive('productPanels',function(){
  return{
    restrict:'E',
    templateUrl:'product-panels.html',
    controller: function(){ // controller function
      this.tab = 1;
      this.selectTab = function(setTab){
        this.tab = setTab;
      };
      this.isSelected = function(setTab){
        return this.tab === setTab;
      }
    },
    controllerAs:'panel' //alias
  };
});
```

## Dependencies

When moving directives/controllers to another file, you need to update the Dependencies in the app file to bring them in.
```javascript
// in app.js
  var app = angular.module('store',['store-products']);
  // add store-products module to handle products
```
Also include the new file in the HTML
```HTML
<script type="text/javascript" src="products.js"> </script>
```

**Services**

Services begin with $ such as...
* `$http` -  http json fetch request from web service
* `$log` - log to console
* `$filter` - filter array

*`$http` Service*

`$http({method:'GET', url:'/products.json'});`  
or Shortcut  
`$http.get('/products.json',{ apiKey: 'myApiKey' });`

These return promisses

**Telling Controllers what Services are Needed**  

Using array syntax

```javascript
app.contoller('someContoller',['$http',function($http){
  var store = this;
  store.products = []; // initiallize value
  // this.products = gems;

  $http.get('/products.json').success(function(data){
    store.products = data;
  });
}]);
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
* `ng-submit` - allows function call upon submission
* `ng-pristine` - input field has not been touched add to class turns to `ng-dirty` when input is typed
* `ng-invalid` - input field is invalid add to class turns to `ng-valid` once valid
* `ng-include="'[file snippit]'"` - brings partials in


**List of Filters**

* `currency` - formats value into local currency
* `date:'MM/dd/yyyy @ h:mm'` - formats date
* `uppercase/lowercase` - converts to all uppercase or lowercase
* `limitTo:#` - limits characters in a string or items in an array
* `orderBy: '(-)(key)'` - orders list by key value '-' is desc no '-' is asc
