import * as passport from 'passport';
import * as BearerStrategy from 'passport-http-bearer';
import { ValidateToken } from '../utils/tokens';
import db from '../db';

passport.use(new BearerStrategy.Strategy(async (token, done) => {
    try {
        let payload = await ValidateToken(token); // validate the provided token
        let [user] = await db.users.findOneById(payload.userid); // using the token's payload, the the user's id in the users table
        if(user) { // if the user exists
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error);
    }
}));

// our bearer strategy tells our server how to handle a bearer token authorization request
// bearer tokens are typically used to protext api endpoints