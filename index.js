const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

//Port at which the mondoDb server is running:
const url = 'mongodb://localhost:27017/';
//Database to connect to:
const dbname = 'nucampsite';

//To access the server. Connects mongo client to the mongo server:
//useUnifiedTopology prevents deprication warning from showing up in the app. 
//The db method defined below will connect us to the nucampsite database on the mongodb server. Can use this db object to access a set of methods to interact with that database.
MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {

  console.log('Connected correctly to server');

  const db = client.db(dbname);

  db.dropCollection('campsites')
    .then(result => {
      console.log('Dropped Collection:', result);
    })
    .catch(err => console.log('No collection to drop.'));

  dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites')
    .then(result => {
      console.log('Insert Document:', result.ops);

      return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
      console.log('Found Documents:', docs);

      return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
        { description: "Updated Test Description" }, 'campsites');
    })
    .then(result => {
      console.log('Updated Document Count:', result.result.nModified);

      return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
      console.log('Found Documents:', docs);

      return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
        'campsites');
    })
    .then(result => {
      console.log('Deleted Document Count:', result.deletedCount);

      return client.close();
    })
    .catch(err => {
      console.log(err);
      client.close();
    });
})
  .catch(err => console.log(err));