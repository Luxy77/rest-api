const express = (require('express'));
const router = express.Router();
const validate = require('../lib/validation');
const { isLoggedIn } = require('../lib/auth');
const passport = require('passport');
 
router.get('/', (req, res) => {
    res.render('welcome')
});

router.get('/register', (req, res) => {
    res.render('register')
    
}); 

router.post('/register', validate.register, passport.authenticate('local.signup', {
    successRedirect:'/authors',
    failureRedirect:'/register',
    }));

router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login', validate.login, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/books/catalog',
        failureRedirect: '/login',
    }) (req, res, next)
});

router.get('/logout', isLoggedIn, (req, res) =>{
    req.logOut();
    res.redirect('/login');
});


module.exports = router;   