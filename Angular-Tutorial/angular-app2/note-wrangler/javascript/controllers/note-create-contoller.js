angular.module('NoteWrangler')
// .controller('NoteCreateController', function($http) {
//   var controller = this;
//   this.saveNote = function(note) {
//    $http({method: 'POST', url: '/notes', data: note})
//   };
// });

// Using services and scope

.controller("NoteCreateController", function($scope, Note) {
  // Note service injected inot controller
  this.saveNote = function(note){
    Note.create() // call Note.create function
  };
});
