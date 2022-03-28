const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysqlConnection = require('../database');
const helpers = require('./helpers')

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body)
    const rows = await mysqlConnection.query('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length > 0 ) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user);
        }else{
            done(null, false)
        }
        
    }else{
        return(done, null)
    }
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const {fullname } = req.body;
    const newUser = {
        username, 
        password,
        fullname
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await mysqlConnection.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId

    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
   const rows = await mysqlConnection.query('SELECT * FROM users WHERE id = ?', [id]);
   done(null, rows[0]);
});