const express = require('express');
const app = express();
const routes = require('./routes/users');
const session = require('express-session');
const {secret, hashedSecret} = require('./crypto/config');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: hashedSecret,
    resave: false,
    saveUninitialized: true,
    cookie:{secure: false},
}));

app.use('/', routes);


app.listen(3000, ()=>{
    console.log('Express on http://localhost:3000');
})