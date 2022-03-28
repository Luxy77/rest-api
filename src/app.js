const express = require('express');
const app = express();
const morgan = require('morgan');
const authorsRoutes = require('./routes/authorsRoutes');
const booksRoutes = require('./routes/booksRoutes');
const usersRoutes = require('./routes/usersRoutes');
const path = require('path');
const session = require('express-session');
const passport = require('passport')
require('./lib/passport');

//Settings
app.set('port', process.env.PORT || 3000);

//views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Middlewares 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/authors', authorsRoutes);
app.use('/books/catalog', booksRoutes);
app.use( '/', usersRoutes);

 //Starting the server
app.listen(3000, ()=>{
    console.log('Server on port 3000')
}); 