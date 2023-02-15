const express = require('express');
const app =  express();

const port = 3000;
app.use(express.static('public'))

app.get('/', (req, res) => {
        res.send("hello world")
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
