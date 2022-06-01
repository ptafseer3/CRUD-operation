const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();


MongoClient.connect('mongodb+srv://<username>:<password>@cluster0.qca7a.mongodb.net/?retryWrites=true&w=majority', {
        useUnifiedTopology: true
})
.then(client => {
    console.log('Connected to Database')

    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.use(bodyParser.urlencoded({ extended: true}))
    //res.sendFile(__dirname + '/index.html')

    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
          .then(results => {
            console.log(results)
          })
          .catch(error => console.error(error))
    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.log(error))
    })

    app.listen(3000, function() {
        console.log("Listening on port 3000")
    })

})
.catch(console.error)   