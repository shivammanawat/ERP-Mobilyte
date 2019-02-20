const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/user');
const config = require('./config/database');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const cookieSession=require('cookie-session');
const app=express();
mongoose.set('useCreateIndex', true);
mongoose.connect(config.database,{ useNewUrlParser: true }).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
mongoose.connection.on('connected', () => {
    console.log('Connected to Database '+config.database);
  });
  mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
  });
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.static(path.join(__dirname,'./public')));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/user', users);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port, () => {
    console.log('Server started on port '+port);
  });
  

