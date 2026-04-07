const { MongoClient } = require('mongodb');

let db;

const initDb = (callback) => {
  if (db) {
    console.log('Database is already initialized!');
    return callback(null, db);
  }

  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      db = client.db('bookAuthorsDB'); 
      console.log('Connected to MongoDB!');
      callback(null, db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initDb first!');
  }
  return db;
};

module.exports = { initDb, getDb };