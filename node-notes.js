// Node is for

// real time network aplications
// Advantage Node is Non-Blocking
// For lightweight applications

var http = require('http');
http.createServer(function(req, res)){
  res.writeHead(200);
  res.write("Hello World");
  setTimeout(function(){ // represent long running action
    res.write("process is done");
    res.end();
  }, 5000)
}).listen(8080);
console.log("Listining on 8080..");

// Event Emitters
var EventEmitter = require('events').EventEmitter;
var logger = new EventEmitter();
logger.on('error', function(message){ // listens for 'error' and executes function
  console.log('ERR: '+ message);
})

logger.emit('error', 'Spilled Milk') // how errors are emitted

// Alternitive to create server
var server = http.createServer();
server.on('request',function(req, res){ // listens for 'request' to run callback
});
server.on('close',function(){ // listens for 'close' to run callback
});

// Streams

http.createServer(function(req, //readable stream
   res //writable stream
 )){
  res.writeHead(200);
  res.write("<p>Hello World</p>");
  setTimeout(function(){ // represent long running action
    res.write("<p>process is done</p>");
    res.end();
  }, 5000)
}).listen(8080);
// browser receives 'Hello World' 5sec later receives 'process is done'

// request inherits from EventEmitter triggering events (readable) and (end)

// Example

http.createServer(function(req, //readable stream
   res //writable stream
 )){
  res.writeHead(200);
  req.on('readable', function(){
    var chunk = null;
    while(null !== (chunk = req.read())){
      res.write(chunk)// to echo the request no .toString required
    }
  });
  req.on('end', function(){
    res.end(),
  })
}).listen(8080);

// shorter method is to use pipe for this type of functionality
http.createServer(function(req, //readable stream
   res //writable stream
 )){
  res.writeHead(200);
  req.pipe(res);
}).listen(8080);

// Reading and Writing to a file

var fs = require('fs');
var file = fs.createReadStream('readme.md');
var newfile = fs.createWriteStream('readme_copy.md');

file.pipe(newfile);

// File transfer progress
http.createServer(function(req, res)){
  var newfile = fs.createWriteStream('readme_copy.md');
  var fileBytes = req.header['content-length'];
  var uploadBytes = 0;
  req.on('readable', function(){
    var chunk = null;
    while(null !== (chunk = req.read())){
      uploadBytes += chunk.length;
      var progress = (uploadBytes/fileBytes) * 100;
      res.write('progress '+ parseInt(progress, 10) + "%\n");
    }
  })
  req.pipe(res);
}).listen(8080);


// Building Modules
// in custom_hello.js
var hello = function(){
  console.log("hello");
}
module.exports = hello
// alternitively custom_bye.js
exports.goodbye = function(){
  console.log("goodbye");
}

// in app.js
var hello = require('./custom_hello');
var gb = require('./custom_bye');

hello(); // logs "hello"
gb.goodbye(); // logs "goodbye"


//  in module_exports.js
function foo(){};
function bar(){};
function baz(){}; // private method
exports.foo = foo;
exports.bar = bar;

// in app
var mymods = require('./module_exports');
mymods.foo();
mymods.bar();


// encapsulation
var http = require('http');
var makeRequest = function(message){
  var options = {
    host: localhost,
    port: 8080,
    path: '/',
    method: post
  }
  var request = http.req(options, function(response){
    response.on('data', fuction(data){
      console.log(data);
    })
    request.write(message);
    request.end();
  })
}
module.exports = makeRequest;

makeRequest("here's the request message")

// package.json file
{
  "name": "project name",
  "version": "1",
  "dependencies":{
    "connect": "1.8.7" // files needed to run
  }
}

// express

// npm install --save express (add to the dependencies)
var express = require('express');
var app = express();
app.get('/',function(request,response){
  response.sendFile(__dirname + "/index.html");
});
app.listen(8080);

// tweet Example

var request = require('request');
var url = require('url');
app.get("/tweets/:username", function(req, response){
  var username = req.params.username;
  options = {
    protocall: "http",
    host:"api.twitter.com",
    pathname: '1/status/user_timeline.json',
    query:{screen_name:username, count:10}
  }
  var twitterUrl = url.format.(options);
  request(twitterUrl).pipe(response);
})

// to render to template
// install imbeded javascript
// npm install --save ejs
// defaults to look for templates in the views directory

var request = require('request');
var url = require('url');
app.get("/tweets/:username", function(req, response){
  var username = req.params.username;
  options = {
    protocal: "http",
    host:"api.twitter.com",
    pathname: '1/status/user_timeline.json',
    query:{screen_name:username, count:10}
  }
  var twitterUrl = url.format.(options);
  request(twitterUrl).pipe(response);
  request(url,function(err,res, body){
    var tweets = JSON.parse(body);
    response.locals = {tweets:tweets, name:username};
    response.render('tweets.ejs');
  }
})

// tweets.ejs
<h1>Tweets for @<%= name%></h1>
<ul>
  <% tweets.forEach(function(tweet){ %>
    <li><%= tweet.text %></li>
    <%})%>
</ul>
