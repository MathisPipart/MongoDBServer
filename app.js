var express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const database = require("./databases/database")
var usersRouter = require('./routes/users');
const chatRoutes = require('./routes/chatRoutes');

var app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Authorizes only localhost:3000
    methods: ['GET', 'POST'], //
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/chat', chatRoutes);

module.exports = app;
