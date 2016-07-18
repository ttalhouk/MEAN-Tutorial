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
