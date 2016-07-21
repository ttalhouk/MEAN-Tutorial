angular.module('NoteWrangler')
  .controller('NotesShowController', function($http, $routeParams){
    var controller = this;
    this.saveNote = function(note) {
      controller.errors = null;
      $http({method: 'POST', url: '/notes', data: note})
      .catch(function(note) {
        controller.errors = note.data.error;
      })
    };
  });
    // makes a get request to /notes/:id and sets the return data to this.notes
