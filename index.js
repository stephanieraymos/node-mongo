const MongoClient = require('mongodb').MongoClient;
//core module from node:
const assert = require('assert').strict;

//Port at which the mondoDb server is running:
const url = 'mongodb://localhost:27017/';
//Database to connect to:
const dbname = 'nucampsite';

//To access the server. Connects mongo client to the mongo server:
//useUnifiedTopology prevents deprication warning from showing up in the app. 
//client in 3rd argument: to use client to connect to the database and perform various operations.
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

  //First argument is the actual value to be checked, second argument is the expected value that we're checking against to see if the first argument strictly equals the second. If they match, continue. If they do not (if err is not strictly equal to null;) then this assert will fail. Throws error, terminates app. (If err === null; then we're good.)
  assert.strictEqual(err, null);

  console.log('Connected correctly to server');

  //This method will connect us to the nucampsite database on the mongodb server. Can use this db object to access a set of methods to interact with that database.
  const db = client.db(dbname);

  //Delete all documents in the campsites collection. This is not normally done. Only doing it so that as I test my app; everytime i run it, i'll start with a fresh, blank collect each time.
  //drop means delete/remove
  //In the parameters for assert.strictEqual we are asserting that error is not null
  db.dropCollection('campsites', (err, result) => {
    assert.strictEqual(err, null);
    console.log('Dropped Collection', result);

    //Recreating campsites collection:
    const collection = db.collection('campsites');
    
    //inserting document into collection:
    collection.insertOne({ name: "Breadcrumb Trail Campground", description: "Test" },
      (err, result) => {
        assert.strictEqual(err, null);
        //ops is short for operations. It can contain different values. In this case it contains an array of the document that was inserted.
        console.log('Insert Document:', result.ops);
        //Get all documents that are now in this collection: Give empty parameter list. (.toArray converts documents to an array of objects)
        collection.find().toArray((err, docs) => {
          assert.strictEqual(err, null);
          console.log('Found Documents:', docs);
          //Immediately closes clients collection to the server
          client.close();
        });
      });
  });
});