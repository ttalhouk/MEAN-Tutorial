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
