angular.module('NoteWrangler')
  .controller('NotesShowController',
  function($http, $routeParams, Note){
    $scope.note = Note.get({id: $routeParams.id}) // using resource
    };
  });
    // makes a get request to /notes/:id and sets the return data to this.notes
