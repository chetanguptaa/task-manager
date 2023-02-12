const express  = require('express');
const app = express();
const tasks = require('./routes/tasks');


app.use(express.json())



app.get('/hello', () => {
    res.end("hello world");
})

app.use('/api/v1/tasks', tasks)

app.listen(3000, console.log("server is listening on port 3000..."))