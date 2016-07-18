var express = require('express'); //requires express modules
var app = express(); // makes an istance of the express object
var logger = require('./logger');
// route from section 1
// app.get('/', function(req, res){
//   // get request to '/' route with callback function
//   // callback takes a request and response argument
//   res.send('Hello World'); // response sent when get route requested
// });
app.use(logger);
app.use(express.static("public"));
app.get('/blocks', function(req, res){
  var blocks = ['element1', 'element2', 'element3'];
  res.send(blocks); // converts array to JSON
});


app.listen(3000, function(){
  console.log('Listening on port 3000');
}); // app listens for requests on port localhost:3000, takes optional callback
