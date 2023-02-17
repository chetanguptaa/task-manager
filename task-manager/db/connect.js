const { MongoClient } = require('mongodb');

const url = 'mongodb://admin:password123@localhost:27017/mydb'; // Name of the database

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

module.exports = {
  connectToDatabase,
  getDatabase: () => client.db(),
};
