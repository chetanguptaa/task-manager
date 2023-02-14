// const express  = require('express');
// const tasks = require('./routes/tasks');
// const connectDB = require('./db/connect');
// require('dotenv').config();
// const app = express();

// app.use(express.json())



// app.get('/', () => {
//         res.send('Task Manager App')
// })

// app.use('/api/v1/tasks', tasks)

// const port = 3000;

// const start =  async () => {
//         try {
//                 await connectDB(process.env.MONGO_URI)
//                 app.listen(port, console.log(`server is listening on port ${port}...`))
//         } catch (error) {
//                 console.log(error)
//         }
// }

// start();
const express = require('express');
const { connectToDb, getDb } = require('./db/connect');

const app = express();

//db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('app is listening on port 3000...');
    });
    db = getDb();
  } else {
    console.log(err);
  }
});

app.get('/books', (req, res) => {
  db.collection('books')
    .find()
    .sort({ author: 1 })
    .toArray()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'could not fetch' });
    });
});
