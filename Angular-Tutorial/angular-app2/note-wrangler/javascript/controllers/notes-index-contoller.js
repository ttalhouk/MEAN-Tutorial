angular.module('NoteWrangler')
  .controller('NotesIndexController', function($http){
    var controller = this;
    $http({ method:'GET', url:'/notes' }).success(function(data){
      contoller.notes = data;
    });
    // makes a get request to /notes and sets the return data to this.notes
  });
