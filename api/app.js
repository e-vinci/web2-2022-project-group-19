const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require("express-fileupload");


const app = express();

const usersRouter = require('./routes/users');
const charactersRouter = require('./routes/characters');
const authRouter = require('./routes/auths');

app.use(logger('dev'));
app.use(express.json());
app.use(
    fileUpload()
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + '/uploads'));
app.use('/users', usersRouter);
app.use('/characters', charactersRouter);
app.use('/auths', authRouter);

module.exports = app;



