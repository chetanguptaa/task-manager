const express  = require('express');
const tasks = require('./routes/tasks');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.json())



app.get('/hello', () => {
        res.send('Task Manager App')
})

app.use('/api/v1/tasks', tasks)

app.listen(3000, console.log("server is listening on port 3000..."))