// const mongoose = require('mongoose');



// const connectDB = (url) => {
//     return mongoose.connect(url, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//     })
// }

// module.exports = connectDB
let dbConnection;    

const { MongoClient } = require('mongodb');

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://admin:password@localhost:27017/bookstore',{useNewUrlParser:true,useUnifiedTopology:true})
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}