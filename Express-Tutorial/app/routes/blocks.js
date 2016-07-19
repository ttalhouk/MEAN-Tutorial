var express = require('express');
var router = express.Router(); // returns router middleware that can be mounted anywhere

// moved from app.js
var parser = require('body-parser'); // access to body-parser methods
// route from section 1
// app.get('/', function(req, res){
//   // get request to '/' route with callback function
//   // callback takes a request and response argument
//   res.send('Hello World'); // response sent when get route requested
// });
var parseUrlEncoded = parser.urlencoded({ extended: false }); // forces use of node querystring parser


var blocks = {
  'Fixed': "Block secured in place",
  'Movable': "Capable of being moved",
  'Rotate': "Moving about an axis"
};
var locations = {
  'Fixed': "1st floor",
  'Movable': "2nd floor",
  'Rotate': "3rd floor"
};
//

// moving routes from app.js
router.route('/') // root directory which is '/blocks'
  .post(parseUrlEncoded, function(req, res){
    var newBlock = req.body // serialized data sent from ajax request
    blocks[newBlock.name] = newBlock.description;
    res.status(201).json(newBlock.name);
  })
  .get(function(req, res){
    var allBlocks = Object.keys(blocks)
    if(req.query.limit >= 0){
      res.json(allBlocks.slice(0, req.query.limit));
    } else {
      res.json(allBlocks); // responds with json formating explicitly
    }
  });

router.route('/:name') // root directory which is '/blocks' making this /blocks/:name
  .all(function(req, res, next){ // does this route for all :name routes
    var name = req.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    req.blockName = block;
    next();
  })
  .get(function(req, res){

    var description = blocks[req.blockName];
    if (!description){
      res.status(404).json("No description for " + req.params.name + " was found");
    } else {
      res.json(description);
    }
  })
  .delete(function(req, res){
    delete blocks[req.blockName];
    res.sendStatus(200);
  });

module.exports = router;
