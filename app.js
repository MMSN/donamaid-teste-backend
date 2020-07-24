//3rd package
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const ordersRoutes = require('./routes/orders');
const clientsRoutes = require('./routes/clients');
const professionalsRoutes = require('./routes/professionals');
const addressesRoutes = require('./routes/addresses');

const MONGODB_URI = 
    //`mongodb+srv://testeDonamaid:pelotas@cluster0-kvr5h.mongodb.net/testedonamaid?retryWrites=true&w=majority`
    //`mongodb+srv://testeDonamaid:pelotas@cluster0-kvr5h.mongodb.net/testedonamaid?retryWrites=true&w=majority`
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-kvr5h.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;
const app = express();

//app.use(bodyParser.urlencoded());
app.use(bodyParser.json()); // app/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next();
});

app.use('/orders', ordersRoutes);
app.use('/clients', clientsRoutes);
app.use('/professionals', professionalsRoutes);
app.use('/addresses', addressesRoutes);

mongoose.
    connect(MONGODB_URI)
    //'mongodb+srv://testeDonamaid:pelotas@cluster0-kvr5h.mongodb.net/testedonamaid?retryWrites=true&w=majority'
    //'mongodb+srv://testeDonamaid:pelotas@cluster0-kvr5h.mongodb.net/testeDonamaid?retryWrites=true&w=majority'
    .then(result => {
        console.log('Connected!');
        app.listen(process.env.PORT || 8080);
    })
    .catch(err => console.log(err));

//app.listen(8080);

//mongodb+srv://<username>:<password>@cluster0-kvr5h.mongodb.net/<dbname>?retryWrites=true&w=majority
//mongodb+srv://testeDonamaid:pelotas@cluster0-kvr5h.mongodb.net/testedonamaid?retryWrites=true&w=majority
