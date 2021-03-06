var express = require('express'); //requires express modules
var app = express(); // makes an istance of the express object
var logger = require('./logger');

// Moved to route module
  // var parser = require('body-parser'); // access to body-parser methods
  // // route from section 1
  // // app.get('/', function(req, res){
  // //   // get request to '/' route with callback function
  // //   // callback takes a request and response argument
  // //   res.send('Hello World'); // response sent when get route requested
  // // });
  // var parseUrlEncoded = parser.urlencoded({ extended: false }); // forces use of node querystring parser

app.use(logger);
app.use(express.static("public"));

// from router module to replace the code below
var blocks = require('./routes/blocks');
app.use('/blocks', blocks)

// Moved to route module
  // var blocks = {
  //   'Fixed': "Block secured in place",
  //   'Movable': "Capable of being moved",
  //   'Rotate': "Moving about an axis"
  // };
  // var locations = {
  //   'Fixed': "1st floor",
  //   'Movable': "2nd floor",
  //   'Rotate': "3rd floor"
  // };

// moved to route module in the .all route
  // app.param('name',function(req, res, next){
  //   var name = req.params.name;
  //   var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
  //   req.blockName = block;
  //   next();
  // });


// moved to blocks.js
  // app.route('/blocks')
  //   .post(parseUrlEncoded, function(req, res){
  //     var newBlock = req.body // serialized data sent from ajax request
  //     blocks[newBlock.name] = newBlock.description;
  //     res.status(201).json(newBlock.name);
  //   })
  //   .get(function(req, res){
  //     var allBlocks = Object.keys(blocks)
  //     if(req.query.limit >= 0){
  //       res.json(allBlocks.slice(0, req.query.limit));
  //     } else {
  //       res.json(allBlocks); // responds with json formating explicitly
  //     }
  //   });

// Moved to blocks.js
  // app.route('/blocks/:name')
  //   .get(function(req, res){
  //
  //     var description = blocks[req.blockName];
  //     if (!description){
  //       res.status(404).json("No description for " + req.params.name + " was found");
  //     } else {
  //       res.json(description);
  //     }
  //   })
  //   .delete(function(req, res){
  //     delete blocks[req.blockName];
  //     res.sendStatus(200);
  //   });

app.listen(3000, function(){
  console.log('Listening on port 3000');
}); // app listens for requests on port localhost:3000, takes optional callback
