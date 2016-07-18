var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;


// sets the Database to mongo.DB when required.
exports.connect = function() {
  if(mongo.DB) { return mongo.DB }
  mongoClient.connect('mongodb://localhost:27017/jscom', function(err, db) {
      if(err){
        console.log("Problem with mongo, help!");
        process.exit(1) // closes the connection
      }else{
        console.log("Yay, mongo!")
        mongo.DB = db
      }
  });
}
