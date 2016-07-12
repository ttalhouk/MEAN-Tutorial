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

// socket.io
// npm install --save socket.io

// starting a socket server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client){
  console.log("client connected...");
  client.on('join', function(name){
    client.nickname = name;
  })
  client.emit(messages, {hello: "world"});

  client.on(messages, function(data){
    console.log(data); // from the chat form
    var nickname = client.nickname;
    client.broadcast.emit('messages',nickname + ":" + data) // brodcast to all other clients
    client.emit('messages',nickname + ":" + data) // emits back to client
  });

});

app.get('/', function(req,res){
  res.sendFile(__dirname + "/index.html");
});
server.listen(8080);

// in index.html

<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost:8080');
  var server = io.connect('http://localhost:8080');

  server.on('connect', function(data){
    $('#status').html('connected');// adds connected if connection is made
    nickname = prompt('What is your nickname?');
    server.emit('join', nickname); // sends nickname to the server
  })

  socket.on('messages',function(data){ // listens for messages emitted
    alert.(data.hello); // prints out world
    insertMessage(data); // needs a function (jquery to add the data to the log)
  });

  $('#chat_form').on('submit',function(event){
    var message = $('#chat_input').val();
    socket.emit('messages', message);
  })
</script>

// persistiing data using and array to collect last 10
var messages = [];
var storeMessage = function(name, data){
  messages.push({name:name, data:data});
  if (messages.length > 10){
    messages.shift();
  }
}


var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client){
  console.log("client connected...");
  client.on('join', function(name){
    client.nickname = name;
    messages.forEach(function(message){
      client.emit("messages", message.name + ":" + message.data);
    });
  })

  client.on(messages, function(data){
    console.log(data); // from the chat form
    var nickname = client.nickname;
    client.broadcast.emit('messages',nickname + ":" + data) // brodcast to all other clients
    client.emit('messages',nickname + ":" + data) // emits back to client
    storeMessage(nickname, data)
  });

});

app.get('/', function(req,res){
  res.sendFile(__dirname + "/index.html");
});
server.listen(8080);

// persistiing data using redis database
// npm install redis --save
var redis = require('redis');
var client = redis.createClient();
// setting database messages
client.set('key1', 'value1');
client.set('key2', 'value2');
// getting data
client.get("key1", function(err, reply){
  console.log(reply);
})
// adding stings to the message list
var message = "test message";
client.lpush("messages", message, function(err, reply){ // callback optional
  console.log(reply); // returns the length of the list in the DB
  client.ltrim("messages",0,1); // keeps onlyt the first 2 messages
});

// retreiving from list
client.lrange("messages",0,-1,function(err, messages){
  console.log(messages); // array of values
});

// redis sets
// adding and removing

client.sadd("names", "dog");
client.sadd("names", "cat");
client.sadd("names", "bird");
client.srem("names", "bird"); // removes bird

// reply with all in set
client.smembers("names", function(err,names){
  console.log(names); // ["dog","cat"]
})

///////////////////////////////////////////////




var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redisClient = redis.createClient();

var storeMessage = function(name, data){
  var message = JSON.stringify({name:name, data:data});
  redisClient.lpush("messages",message,function(err,response){
    redisClient.ltrim('messages',0,9);// keeps newest 10
  })

};

io.on('connection', function(client){
  console.log("client connected...");
  client.on('join', function(name){
    client.nickname = name;
    redisClient.lrange('messages',0,-1, function(err,messages){
      messages.reverse();
      messages.forEach(function(message){
        message = JSON.parse(message);
        client.emit("messages", message.name + ":" + message.data);
      });
    });
  });

  client.on(messages, function(data){
    console.log(data); // from the chat form
    var nickname = client.nickname;
    client.broadcast.emit('messages',nickname + ":" + data) // brodcast to all other clients
    client.emit('messages',nickname + ":" + data) // emits back to client
    storeMessage(nickname, data)
  });

});

app.get('/', function(req,res){
  res.sendFile(__dirname + "/index.html");
});
server.listen(8080);
