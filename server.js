const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/config')

const app = express();
const port = config.appPort;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

const mysql = require('./lib/db');

//global.connection = mysql.connect();


const booksRoutes = require('./app/routes/books');
app.use('/books', booksRoutes);

app.listen(port, () => {
    console.log("Server up and listening at port " + port);
})
