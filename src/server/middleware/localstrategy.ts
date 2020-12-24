import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import { comparePasswordToHash } from '../utils/passwords';
import db from '../db';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
// these two lines create a req.user. They must go before you initialize your routes

passport.use(new LocalStrategy.Strategy({
    usernameField: 'email',
    session: false
}, async (email, password, done) => {
    try {
        let [user]: any = await db.users.findOneByEmail(email); // if they have an email, we will find them by their email and make sure they exist
        if(user && comparePasswordToHash(password, user.password)) {// user.password is the hashed password stored in the database
        // if the user exists and the plain text password typed matches the hash in the database, this validates to true
            done(null, user); // we are done with the function, there are no errors and we pass up the user information
        } else {
            done(null, false); // respond with 401 unauthorized
        }
    } catch (error) {
        done(error);
    }
}));

// local lets you authenticate using a username and password in node.js applications
// local is used with logging in to a website