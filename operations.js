//Four methods below to insert, find, remove and update documents
//We can use the coll constant defined below to interact with a specific collection in the mongodb server
//All methods below will return promises as their return values by default since no callbacks were defined.
exports.insertDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.insertOne(document);
};

//The /toArray method below puts all the documents that were found into an array
exports.findDocuments = (db, collection) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};


exports.removeDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

//$set is an update operator follwed by the update object
exports.updateDocument = (db, document, update, collection) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};