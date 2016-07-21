
angular.module('NoteWrangler')  // redeclare app in each module
  .config(function($routeProvider){
    $routeProvider.when('/notes', { //defines /notes
      templateUrl: '/templates/pages/notes/index.html',
      controller: 'NotesIndexController',
      contollerAs: 'indexController'
    })
     .when('/notes/:id', { // route specified with an ID
      templateUrl: 'templates/pages/notes/show.html',
      controller: 'NotesShowController',
      controllerAs: 'showController'
    })
   .when('/users', { // defines /users
     templateUrl: 'templates/pages/users/index.html',
   })

   .when('/', { // defines root path
     templateUrl: '/templates/pages/notes/index.html'
   })
   .otherwise({ redirectTo: '/' }); // catch all redirect to '/' root
  });
