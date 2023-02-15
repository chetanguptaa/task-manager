const express = require('express');
const app =  express();

const port = 3000;

const myLogger = (req, res,next) => {
        console.log("LOGGED");
        next();
}
const requestTime = (req, res,next) => {
        req.requestTime = Date.now();
        res.end();
}


// app.use(express.static('public'))
app.use(myLogger);
app.use(requestTime);


app.get('/', (req, res) => {
        let responseText = 'Hello World!<br>';
        responseText = `<small>Requested at: ${req.requestTime}</small>`;
        res.send(responseText)
})
app.post('/',(req, res) => {
        res.send('Got a POST request')
})
app.put('/user', (req, res) => {
        res.send('Got a put request at /user')
})

app.listen(port,() => {
        console.log(`app is listening on port ${port}`)
})
