const express  = require('express');
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const app = express();

app.use(express.json())



app.get('/hello', () => {
        res.send('Task Manager App')
})

app.use('/api/v1/tasks', tasks)

const port = 3000;

const start =  async () => {
        try {
                await connectDB(process.env.MONGO_URI)
                app.listen(port, console.log(`server is listening on port ${port}...`))
        } catch (error) {
                console.log(error)
        }
}

start();