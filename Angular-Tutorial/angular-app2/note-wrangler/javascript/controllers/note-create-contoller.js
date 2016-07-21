angular.module('NoteWrangler')
.controller('NoteCreateController', function($http) {
  var controller = this;
  this.saveNote = function(note) {
  };$http({method: 'POST', url: '/notes', data: note})
});
