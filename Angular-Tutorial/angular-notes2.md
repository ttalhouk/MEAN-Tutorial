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


**Directives**

* `ng-href='#/path'` - sets an ref link to a tag

**Services**
* `$routeParams` - gets route parameters from url
