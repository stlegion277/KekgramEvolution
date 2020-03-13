"use strict";

const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const server = require('http').Server(app);
const io = require('socket.io')(server, {serveClient: true});
const mongoose = require('mongoose');
const passport = require('passport');
const {Strategy} = require('passport-jwt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {jwt} = require('./config');

passport.use(new Strategy(jwt, function(jwt_payload, done) {
    if(jwt_payload != void(0)) return done(false, jwt_payload);
    done();
}));

mongoose.connect('mongodb://localhost:27017/chatik', {});
mongoose.Promise = require('bluebird');
mongoose.set('debug',true);

nunjucks.configure('./client/view', {
    autoescape: true,
    express: app
});

app.use(bodyParser.urlencoded({extended:false}));

app.use(cookieParser());

app.use(bodyParser.json());

require('./router')(app);
require('./sockets')(io);



server.listen(3000,'0.0.0.0', () => {
    console.log('server started on port 3000');
});