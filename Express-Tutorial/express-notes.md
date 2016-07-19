# Express JS Notes  
- Notes taken from codeschool express js course  

**Installing Express**  
`npm install express` installs express from from NPM registry.  
- can include version by adding @(version number) after express

*Building Hello World App*  

```Javascript
// app.js file
var express = require('express'); //requires express modules
var app = express(); // makes an istance of the express object

app.get('/', function(req, res){
  // get request to '/' route with callback function
  // callback takes a request and response argument
  res.send('Hello World'); // response sent when get route requested
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
}); // app listens for requests on port localhost:3000, takes optional callback
```

Express also has methods for
- `app.post`
- `app.put`
- `app.patch`
- `app.delete`

to start the server from command line
```
$ node app.js
> listening on port 3000
```

to make requests from the command line  
```
$ curl http://localhost:3000/
```

you can use node functions as well
```Javascript
app.get('/', function(req, res){
  // get request to '/' route with callback function
  // callback takes a request and response argument
  res.write('Hello World'); // response sent when get route requested
  res.end();
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
```

*Responding with JSON*

```Javascript
app.get('/blocks', function(req, res){
  var blocks = ['element1', 'element2', 'element3'];
  res.send(blocks); // converts array to JSON

});

```
testing response with headers
```
$ curl -i http://localhost:3000/blocks
```
To be more descriptive use response.json
```Javascript
app.get('/blocks', function(req, res){
  var blocks = ['element1', 'element2', 'element3'];
  res.json(blocks); // responds with json formating explicitly
});
```

*Redirecting to another path*  
```Javascript
app.get('/blocks', function(req, res){
  res.redirect('/parts'); // redirects to /parts route
});
```
For perminent redirects use 301 status code like the following  
```Javascript
app.get('/blocks', function(req, res){
  res.redirect(301, '/parts'); // redirects takes optional status code arg
});
```
## Middleware  

**Serving HTML file**  
```Javascript
app.get('/', function(req, res){
  res.sendFile(__dirname + "/public/index.html");
  // sends the file
});
```
`__dirname` is the directory the app.js script is located in

Alternatly we could use the static Middleware that comes with express
```Javascript

app.use(express.static("public"));
  // sends all files within the folder specified

```

*Middleware* are functions that execute sequentially that access the request/response information prior to hitting the route.  Middleware is called with `.use` and is formatted like the following example:
```Javascript
app.use(function(req, res, next){
  // code goes here to validate, parse, etc...
  next(); // sends req, res to next middleware function... must be called
});
```
Once the send function is called responding back to the client, no other middleware or routes are run.

**AJAX calls**  
```Javascript
$(function(){
  $.get('/blocks', appendToList);
  function appendToList(data){
    var list = [];
    for (var i; i < data.length; i+=1){
      list.push($('<li>',{ text: data[i] }));
    }
    $('.blocks-list').append(list)
  };
});
```

**Custom Middleware**

Write middleware and export like this...
```Javascript
module.exports = function (req, res, next){
  var start = +new Date(); // + converts Date to millisec
  var stream = process.stdout;
  var url = req.url;
  var method = req.method;
  res.on('finish', function(){
    var duration = +new Date() - start;
    var message = method + " to " + url + " took " + duration + " ms. \n\n";
    stream.write(message); // writes to message stream
  })

  next();
};
```

then require it in app.js `var logger = require('./logger');` then use `app.use(logger);`

a library for logging can be found at  
[Morgan]: https://github.com/expressjs/morgan

## Reading Data from URL (Params)  
GET requests can have query string parameters such as making a query to our blocks route and adding a `/blocks?limit=1` to return only one element.  The query can be accessed through `(response argument).query`.  For example:

```Javascript
app.get('/blocks', function(req, res){
  var blocks = ['element1', 'element2', 'element3'];

  if(req.query.limit >= 0){
    res.json(blocks.slice(0, req.query.limit));
  } else {
    res.json(blocks); // responds with json formating explicitly  
  }
});
```

If we want specific url for items we can do the following...

```Javascript
var blocks = {
  'Fixed': "Block secured in place",
  'Movable': "Capable of being moved",
  'Rotate': "Moving about an axis"
}

app.get('/blocks/:name', function(req, res){
  var description = blocks[request.params.name];
  res.json(description);
});
```

This will give the description when the name is passed as params.  If name is not valid, we will want to send a 404 status code.  To do this...

```Javascript
app.get('/blocks/:name', function(req, res){
  var description = blocks[request.params.name];
  if (!description){
    res.status(404).json("No description for " + request.params.name + " was found");
  } else {
    res.json(description);
  }
});
```
**Normalizing Request Params**  
To be able to accept different cases, you may want to normalize the input.
```Javascript
app.get('/blocks/:name', function(req, res){
  var name = request.params.name
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase;
  var description = blocks[block];
  if (!description){
    res.status(404).json("No description for " + request.params.name + " was found");
  } else {
    res.json(description);
  }
});
```
Instead of doing this normaization within the route, the app has access to the params.
```javascript
app.param('name',function(req, res, next){
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

// can use the same middleware
app.get('/locations/:name', function(req, res){
  var location = locations[req.blockName];
  if (!description){
    res.status(404).json("No description for " + request.params.name + " was found");
  } else {
    res.json(description);
  }
});

```

## Post requests

To parse data sent in post requests install body-parser:  
`npm install body-parser`  
This will add it to the express app.  Next require it in the app.  
`var parser = require('body-parser')`  

Posts can take multiple handlers as arguments and will call them sequentially.  
```javascript
var parsUrlEncoded = parser.urlencoded({ extended: false });
// forces use of node query parser

app.post('/blocks', parseUrlEncoded, function(req, res){
  var newBlock = req.body // serialized data sent from ajax request
  blocks[newBlock.name] = newBlock.description;
  res.status(201).json(newBlock.name);
})
```
## Delete requests

Add anchor tag to element that should be deleted and create ajax request to handle targeting

```javascript
$('.blocks-list').on('click', 'a[data-block]', function(e){
  if(!confirm('Are you sure?')){ // confirmation of delete
    return false
  };
  var target = $(e.currentTarget)
  $.ajax({
    type: "DELETE",
    url: "/blocks/"+ target.data('block')
  }).done(function(){
    target.parents('li').remove() // removes target li item
  });
});
```

set up express route in app.js
```javascript
app.delete('/blocks/:name', function(req, res){
  delete blocks[req.blockName]; // from app.param
  res.sendStatus(200); // use sendStatus to send status and res.body = OK
});
```

## Route instances

To remove duplication in route names use route instances
```javascript
var blocksRoute = app.route('/blocks');
// blocksRoute now replaces app.get('/blocks', ...) and app.post('/blocks', ...)
// like this

blocksRoute.get(function(...){...});

blocksRoute.post(parseUrlEncoded, function(...){...});
```

**Chaining Routes**  

Alternately we can chain the routes like so
```javascript
app.route('/blocks') // remove ; and variable declaration for route name
  .get(function(...){...})
  .post(parseUrlEncoded, function(...){...});
```

## Route Files

In express you can extract routes into files and use them as modules for app.use to run.

```javascript
var blocks = require('.routes/blocks');
app.use('/blocks', blocks) // use the blocks module to run the /blocks route
```
1. Make dedicated folder for routes
  - inside folder make route file

```javascript
// blocks.js

var express = require('express');
var router = express.Router(); // returns router middleware that can be mounted anywhere
// Moved from app.js needed block modulet

var parser = require('body-parser'); // access to body-parser methods
var parseUrlEncoded = parser.urlencoded({ extended: false }); // forces use of node querystring parser

// and data
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

// moving routes from app.js
router.route('/') // root directory which is '/blocks'
  .post(parseUrlEncoded, function(req, res){  })
  .get(function(req, res){  });

router.route('/:name') // root directory which is '/blocks' making this /blocks/:name
  .all(function(req, res, next){   })
  .get(function(req, res){  })
  .delete(function(req, res){  });

module.exports = router;// exports router as node module
```

## Further content

- [Express JS Website]: http://expressjs.com - Express API info

- [Morgan]: https://github/expressjs/morgan - Logger for express
