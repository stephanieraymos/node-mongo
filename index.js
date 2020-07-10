const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

//Port at which the mondoDb server is running:
const url = 'mongodb://localhost:27017/';
//Database to connect to:
const dbname = 'nucampsite';

//To access the server. Connects mongo client to the mongo server:
//useUnifiedTopology prevents deprication warning from showing up in the app. 
//client in 3rd argument: to use client to connect to the database and perform various operations.

//First argument in assert/strictEqual is the actual value to be checked, second argument is the expected value that we're checking against to see if the first argument strictly equals the second. If they match, continue. If they do not (if err is not strictly equal to null;) then this assert will fail. Throws error, terminates app. (If err === null; then we're good.)

 //The db method defined below will connect us to the nucampsite database on the mongodb server. Can use this db object to access a set of methods to interact with that database.
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

  assert.strictEqual(err, null);

  console.log('Connected correctly to server');

  const db = client.db(dbname);

  db.dropCollection('campsites', (err, result) => {
    console.log('Dropped Collection: ', result);

    dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" },
      'campsites', result => {
        console.log('Insert Document:', result.ops);

        dboper.findDocuments(db, 'campsites', docs => {
          console.log('Found Documents:', docs);

          dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
            { description: "Updated Test Description" }, 'campsites',
            result => {
              console.log('Updated Document Count:', result.result.nModified);

              dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found  Documents:', docs);

                dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                  'campsites', result => {
                    console.log('Deleted Document Count:', result.deletedCount);

                    client.close();
                  });
              });
            }
          );
        });
      });
  });
});