const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://chandra:admin@cluster0.mvccd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const options = { useUnifiedTopology: true, useNewUrlParser: true }
var db;

function connectToServer(callback) {
  MongoClient.connect(
    uri,
    options,
    function (err, client) {
      db = client.db("sample_airbnb");
      return callback(err);
    }
  );
}

function getDb(collectionToGet) {
  return db.collection(collectionToGet);
}

module.exports = { connectToServer, getDb };
