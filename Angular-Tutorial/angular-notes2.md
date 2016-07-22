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

## Services

Create a js file in the services folder to hold the services for the app.  Include this in the index html file in a `<script>` tag.
```html
<script src="/javascript/services/note.js"></script>
```

*Services are typically Factories or Providers*

* ***Factory***: Used to share functions across the application
* ***Provider***: Used to share functions across the application and allows for configuration

### Creating a Factory

```javascript
angular.module("<ModuleName>")
.factory("<ServiceName>", function <ServiceName>Factory() {
  return { <object containing shared functions> }
});
```

```javascript
// in note.js (services)
angular.module("NoteWrangler")
  .factory("Note", function NoteFactory() {
    return {
      all: function() { // now Note.all can be used to get all notes
        return $http({method: "GET", url: "/notes"});
      },
      create: function(){ // now Note.create can be used to create a note
        return $http({method: "POST", url: "/notes", data: note});
      };
    };
  });
```
Now use in the controller like so...
```javascript
// in notes-index-controller.js
angular.module('NoteWrangler')
.controller("NotesIndexController", function($scope, Note) {
  // Note service injected into controller
  Note.all() // call Note.all function
    .success(function(data) {
      $scope.notes = data;
    });
});

```

### Using external Services (API)

If we want to use Gravitar API we can create a service to call it when needed.

```javascript
// set up gravitar.js service
// to get gravatar for users
// Needs:

// 1. Hash user’s email into a hash.
// alyssa@codeschool.com bf4ee76b5f3a6bfed26bca5460bc3f22
//  CryptoJS.MD5(email)
// Include in Index with script tag
//<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script>

// 2. Add this hash onto a Gravatar URL.
//  http://www.gravatar.com/avatar/bf4ee...png
// 3. Use this URL in a template.
//  <img ng-src='http://...bf4ee...png'/>
// create the url from the pieces given

angular.module("NoteWrangler")
  .factory( "Gravatar",function GravatarFactory() {
    // factory variables
    var avatarSize = 80; // Default size
    var avatarUrl = "http://www.gravatar.com/avatar/"; // base url
    return{
      generate: function(email){
        return avatarUrl + CryptoJS.MD5(email) + "?size=" + avatarSize.toString();
      }
    };
  });

  // to use, inject the factory and call it like so...

  //Gravatar.generate("[email address]")
```

### Providers

Providers use `$get` function to configure function

To create a provider (from the previous factory):

```javascript
angular.module("NoteWrangler")
  .provider("Gravatar", function GravatarProvider() {
    var avatarSize = 80; // Default size
    var avatarUrl = "http://www.gravatar.com/avatar/";

    this.setSize = function(size){
      avatarSize = size;
    }; // sets configurable size


    this.$get = function() {
      return function(email){
        return avatarUrl + CryptoJS.MD5(email) + "?size=" + avatarSize.toString();
      };
    }
  });
```
```javascript
// in app.js
.config(function (GravatarProvider) { // note use whole name of provider
 GravatarProvider.setSize(100); // setting the variable
});
```

### $Resource

`ngResource` covers many of the reusable resources.  It gets added to the vendor directory.  This needs to be included with the script tag in the index file.

`  <script src="/javascript/vendor/angular-resource.js"></script>`

In app.js include it as a resource.
`angular.module("NoteWrangler", ['ngRoute','ngResource'])`

**Directives**

* `ng-href='#/path'` - sets an ref link to a tag
* `ng-bind-html` - renders sent html tags as html instead of strings

**Services**
* `$routeParams` - gets route parameters from url
* `$scope` - sets controller scope instead of using this.  No longer have to reference controller or alias to get methods and variables inside.
* `$sce` - tell angular that the information is safe to render such as in `$sce.trustAsHtml([html markups])`
