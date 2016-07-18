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
