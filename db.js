const MongoClient = require("mongodb").MongoClient;

// Mognodb atlas url
const uri =
  "mongodb+srv://admin:admin@cluster0.myiqq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const options = { useUnifiedTopology: true, useNewUrlParser: true };
var db;

/**
 * callback is a function called at the completion of a given task;
 * this prevents any blocking, and allows other code to be run in the meantime.
 * The callback gets called after the function is done with all of its operations
 */
function connectToServer(callback) {
  MongoClient.connect(uri, options, function (err, client) {
    if (err) {
      console.log(err);
    }
    /**
     * Reuse the db object that results from MongoClient.connect().
     * This gives you pooling, and will provide a noticeable speed increase as compared with
     * opening/closing connections on each db action.
     */
    db = client.db("sample_airbnb");

    /**
     * If the function hits an error, then they typically call the
     * callback with the first parameter being an Error object.
     * If it cleanly exits, then they will call the callback with the
     * first parameter being null and the rest being the return value(s).
     */
    return callback(err, client);
  });
}

function getDb(collectionToGet) {
  return db.collection(collectionToGet);
}

module.exports = { connectToServer, getDb };
