var express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const database = require("./databases/database")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const chatRoutes = require('./routes/chatRoutes');

var app = express();

// Configuration de CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Autorise uniquement localhost:3000
    methods: ['GET', 'POST'], // Autorise uniquement GET et POST
    allowedHeaders: ['Content-Type'], // Autorise uniquement les headers spécifiques
};

app.use(cors(corsOptions)); // Utilisation de CORS avec les options
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRoutes);

module.exports = app;
