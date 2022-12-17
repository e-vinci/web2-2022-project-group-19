const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const usersRouter = require('./routes/users');
const charactersRouter = require('./routes/characters');
const openaiRouter = require('./routes/openai');

// eslint-disable-next-line prefer-destructuring

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/characters', charactersRouter);
app.use('/openai', openaiRouter );



module.exports = app;
