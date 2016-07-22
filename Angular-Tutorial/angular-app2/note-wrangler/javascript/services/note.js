angular.module("NoteWrangler")
  // .factory("Note", function NoteFactory() {
  //   return {
  //     all: function() { // now Note.all can be used to get all notes
  //       return $http({method: "GET", url: "/notes"});
  //     },
  //     create: function(){ // now Note.create can be used to create a note
  //       return $http({method: "POST", url: "/notes", data: note});
  //     };
  //   };
  // });

// Injecting resource
.factory("Note", function NoteFactory($resource) {
  return $resource("/notes/:id",{},{});
});
