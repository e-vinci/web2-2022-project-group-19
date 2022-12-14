const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');


const usersRouter = require('./routes/users');
const charactersRouter = require('./routes/characters');

const app = express();

dotenv.config();
// eslint-disable-next-line prefer-destructuring
const API_KEY = process.env.API_KEY;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/characters', charactersRouter);
app.get('/api-key', (req, res) => {

    res.json({ key: API_KEY });
});


module.exports = app;
