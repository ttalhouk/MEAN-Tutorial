// get gravatar for users
// Needs

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

// angular.module("NoteWrangler")
//   .factory( "Gravatar",function GravatarFactory() {
//     // factory variables
//     var avatarSize = 80; // Default size
//     var avatarUrl = "http://www.gravatar.com/avatar/"; // base url
//     return{
//       generate: function(email){
//         return avatarUrl + CryptoJS.MD5(email) + "?size=" + avatarSize.toString();
//       }
//     };
//   });

// to use, inject the factory and call it like so...

//Gravatar.generate("[email address]")


// converting factory to provider

angular.module("NoteWrangler")
  .provider("Gravatar", function GravatarProvider() {
    var avatarSize = 80; // Default size
    var avatarUrl = "http://www.gravatar.com/avatar/";

    this.setSize = function(size){
      avatarSize = size;
    }; // sets configurable size

    this.$get = function() { // defines the $get function
      return function(email){
        return avatarUrl + CryptoJS.MD5(email) + "?size=" + avatarSize.toString();
      };
    }
  });

// config the size in the app.js file
