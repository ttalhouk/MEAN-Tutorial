angular.module('NoteWrangler')
  // .controller('NotesIndexController', function($http){
  //   var controller = this;
  //   $http({ method:'GET', url:'/notes' }).success(function(data){
  //     contoller.notes = data;
  //   });
  //   // makes a get request to /notes and sets the return data to this.notes
  // });

// using scope and services instead...

// .controller("NotesIndexController", function($scope, Note) {
//   // Note service injected into controller
//   Note.all() // call Note.all function
//     .success(function(data) {
//       $scope.notes = data;
//     });
// });

// Using resource

.controller("NotesIndexController", function($scope,$routeParams, Note) {
  // Note service injected into controller
  $scope.note = Note.query();
});
