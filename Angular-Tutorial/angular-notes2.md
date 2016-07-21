# Notes from Staying Sharp with Angular

Notes taken from Advanced Angular tutorial

## Wiring views together

In the main index.html file include the `ng-app="[App Name]"` in the `<html>` tag.

Include a routes.js file in the javascript directory.

**4 steps for Angular Routing**

1. `ngView`
2. `ngRoute` Library
3. Import `ngRoute` Module
4. Define routes

step 1
```html
<div class="main-wrapper">
     <!-- declare ng-view here -->
  <div ng-view></div>
</div>
```

step 2
```html
<script type="js/vendor/angular-route.js"></script>
```

step 3
```javascript
// in app.js

angular.module("NoteWrangler", ['ngRoute'])
```

step 4
```javascript
// in routes.js
angular.module('NoteWrangler')
 .config(function($routeProvider){});
```

**Defining Routes**
`.when(path, route);`
Adds a new route definition to the $route service.
`.otherwise(params);`
Sets route definition that will be used on route change when no other route definition is matched.

```javascript
.config(function($routeProvider){
  $routeProvider.when('/notes', { //defines /notes
    templateUrl: '/templates/pages/notes/index.html'
  })

 .when('/users', { // defines /users
   templateUrl: 'templates/pages/users/index.html',
 })

 .when('/', { // defines root path
   templateUrl: '/templates/pages/notes/index.html'
 })
 .otherwise({ redirectTo: '/' }); // catch all redirect to '/' root
});
```

## Routes Logic  

* `$http.get` get data
* `$http.post` create data
* `$http.put` change data
* `$http.delete` destroy data

Sending data: `$http({ method: 'POST', url: '/resource/path.json', data: noteData });`

Routes can load controllers associated with them.  
```
angular.module('NoteWrangler')
 .config(function($routeProvider) {
   $routeProvider.when('/notes', {
     templateUrl: 'templates/pages/notes/index.html',
     controller: function(){   
     }
});
// alternately use separate file for controller and call it in the route

angular.module('NoteWrangler')
 .config(function($routeProvider) {
   $routeProvider.when('/notes', {
     templateUrl: 'templates/pages/notes/index.html',
     controller: 'NotesIndexController',
     contollerAs: 'indexController'
   });
 });
 ```
*Routes errors*

```javascript
controller.errors = null;
$http({method: 'POST', url: '/notes', data: note})
.catch(function(note) {
  controller.errors = note.data.error;
})
```
```html
<p ng-if="createController.errors"> {{createController.errors}} </p>

```

## Custom Directives and $scope

Using `$scope` sets the scope of the controller so it doesn't need to be called referenced in the html where the contoller is being used.
```javascript
angular.module("NoteWrangler")
 .directive("nwCard", function() {
    return {
      restrict: "E",
      templateUrl: "templates/directives/nw-card.html",
      controller: function($scope){
        $scope.header = "Note Title";
      },

      // controllerAs: "card" // not required as scope was established
    };
  });
```
```html
<div class="card">
  <!-- <h2 class="h3">{{card.header}}</h2>
  changed to -->
  <h2 class="h3">{{header}}
</div>
```

**Isolating Scope**  
You can isolate the scope of a child by passing scope an empty object, but this will no longer have access to its parent's information so varibles will need to be passed into the scope.
```javascript
angular.module("NoteWrangler")
 .directive("nwCard", function() {
   var num = 1;
    return {
      restrict: "E",
      scope: {
        header: "@", // using = creates two way binding (change to one,
        // changes the other)
        icon: "="
      },
      templateUrl: "templates/directives/nw-card.html",
      controller: function($scope){
        $scope.header = "Note Title"+ num++;
      },

      // controllerAs: "card" // not required as scope was established
    };
  });
```
allows
```html
<nw-card header="{{note.title}}" icon="icon.icon"></nw-card>
<!-- brackets not needed in two way binding -->
```

**Link parameter**  

```
angular.module("NoteWrangler")
 .directive("nwCard", function nwCardDirective(){
  return {
    link: function(){
      $("div.card").on("click", function(){
        $("div.card p").toggleClass("hidden")
      }
    },
    ...
```
To not search the entire Dom and only the card template use `element`

```
 angular.module("NoteWrangler")
 .directive("nwCard", function nwCardDirective(){
  return {
    link: function(scope, element, attrs){
      element.on("click", function(){ };
      element("div.card p").toggleClass("hidden");
    };
      console.log(attrs.header);
  }
...
```
attrs refer to element attributes such as 'header' in this case.

**Directives**

* `ng-href='#/path'` - sets an ref link to a tag
* `ng-bind-html` - renders sent html tags as html instead of strings

**Services**
* `$routeParams` - gets route parameters from url
* `$scope` - sets controller scope instead of using this.  No longer have to reference controller or alias to get methods and variables inside.
* `$sce` - tell angular that the information is safe to render such as in `$sce.trustAsHtml([html markups])`
