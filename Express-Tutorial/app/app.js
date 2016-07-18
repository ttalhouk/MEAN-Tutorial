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

var blocks = {
  'Fixed': "Block secured in place",
  'Movable': "Capable of being moved",
  'Rotate': "Moving about an axis"
}
var locations = {
  'Fixed': "1st floor",
  'Movable': "2nd floor",
  'Rotate': "3rd floor"
}

app.params('name',function(req, res, next){
  var name = request.params.name
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase;
  req.blockName = block;
  next();
})

app.get('/blocks/:name', function(req, res){
  var description = blocks[req.blockName];
  if (!description){
    res.status(404).json("No description for " + request.params.name + " was found");
  } else {
    res.json(description);
  }
});

app.get('/blocks', function(req, res){
  var blocks = ['Fixed', 'Movable', 'Rotate'];

  if(req.query.limit >= 0){
    res.json(blocks.slice(0, req.query.limit));
  } else {
    res.json(blocks); // responds with json formating explicitly
  }
});


app.listen(3000, function(){
  console.log('Listening on port 3000');
}); // app listens for requests on port localhost:3000, takes optional callback
