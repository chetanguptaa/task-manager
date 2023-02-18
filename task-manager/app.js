const express = require('express');
const app =  express();
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
require('dotenv').config();
const tasks = require('./routes/tasks');



app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);



const port = 3000;

const start = async () => {
        try {
                await connectDB('mongodb://admin:password@mongodb:27017');
                app.listen(port, () => {
                        console.log(`server is listening on port ${port}...`)
                });
        } catch (error) {
                console.log(error);
        }
};
start();