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

const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:8080/', 'https://e-vinci.github.io/'],
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    fileUpload()
);

app.use("/uploads",cors(corsOptions), express.static(__dirname + '/uploads'));

app.use('/users',cors(corsOptions), usersRouter);
app.use('/characters',cors(corsOptions), charactersRouter);
app.use('/auths',cors(corsOptions), authsRouter);
app.use('/votes',cors(corsOptions), votesRouter);
app.use('/comments',cors(corsOptions), commentsRouter);
app.use('/openai',cors(corsOptions), openaiRouter);




module.exports = app;
