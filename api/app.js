const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require("express-fileupload");

const usersRouter = require('./routes/users');
const charactersRouter = require('./routes/characters');
const authsRouter = require('./routes/auths');
const votesRouter = require('./routes/votes');
const commentsRouter = require('./routes/comments');
const openaiRouter = require('./routes/openai');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    fileUpload()
);

app.use("/uploads", express.static(__dirname + '/uploads'));

app.use('/users', usersRouter);
app.use('/characters', charactersRouter);
app.use('/auths',authsRouter);
app.use('/votes', votesRouter);
app.use('/comments', commentsRouter);
app.use('/openai', openaiRouter);


module.exports = app;