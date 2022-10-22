const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport')
const session = require('express-session');
const { loginCheck } = require('./auth/passport')
dotenv.config();
loginCheck(passport)

const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('e don connect'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'onebody',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/login'));
app.use('/', require('./routes/dashboard'));

const PORT = 4111;
app.listen(PORT, console.log('Server has started at port ' + PORT));