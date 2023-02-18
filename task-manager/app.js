const express = require('express');
const app =  express();
const Task = require('./models/Task');
const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

app.use(express.static('./public'));
app.use(express.json());


app.get('/api/v1/tasks', (req, res) => {
        const tasks = Task.find({});
        res.status(200).json({ tasks })
})

app.post('/api/v1/tasks', (req, res)=> {
        const task = Task.create(req.body);
        res.status(201).json({task})
})

app.get('/api/v1/tasks/:id', (req, res, next) => {
        const { id: taskID } = req.params;
        const task = Task.findOne({_id: taskID });
        if ( !task) {
                return next(`no task with id ${taskID}`, 404);
        } 
        res.status(200).json({task});
});

app.delete('/api/v1/tasks/:id', (req, res, next) => {
        const { id: taskID} = req.params;
        const task = Task.findOneAndDelete({_id: taskID});
        if ( !task) {
                return next(`no task with id ${taskID}`, 404);
        }
        res.status(200).json({task})
});

app.put('/api/v1/tasks/:id', (req, res , next) => {
        const { id : taskID} = req.params;
        const task = Task.findOneAndUpdate({_id: taskID}, req.body, {
                new: true,
                runValidators: true,
        })
        if ( !task ) {
                return next(`no task with id ${taskID}`, 404);
        }
        res.status(200).json({ task })
})


const port = 3000;
// app.listen(port,() => {
//         console.log(`app is listening on port ${port}`)
// })

const start = async () => {
        try {
                await connectDB('mongodb://admin:password@localhost:27017');
                app.listen(port, () => {
                        console.log(`server is listening on port ${port}...`)
                });
        } catch (error) {
                console.log(error);
        }
};
start();