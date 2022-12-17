const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const charactersRouter = require('./routes/characters');
const authsRouter = require('./routes/auths');
const votesRouter = require('./routes/votes');
const commentsRouter = require('./routes/comments');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/characters', charactersRouter);
app.use('/auths', authsRouter);
app.use('/votes',votesRouter);
app.use('/comments',commentsRouter);


module.exports = app;
