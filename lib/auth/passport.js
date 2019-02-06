const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    { comparePassword } = require('../helpers/bcrypt.helper');



module.exports = passport => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            db.collection('User').findOne({ email: email }, async function (err, user) {
                console.log('user requested password caught in passport', password);
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                const matchPassword = await comparePassword(password, user.password);
                if (!matchPassword) { return done(null, false); }
                return done(null, user);
            });
        }
    ));


}