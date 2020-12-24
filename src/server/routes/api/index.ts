import * as express from 'express';
import * as passport from 'passport';
import blogsRouter from './blogs';

const router = express.Router();

router.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user; // if the user is authenticated using the bearer token strategy, we will display the req.user info we have stored as that user's information
        return next(); // regardless of whether our user is successfully authenticated or not, we want to go to the next step (using the blogs router)
    })(req, res, next); // req, res and next need to be passed along in a callback function to pass down to blogs router
});

router.use('/blogs', blogsRouter);

export default router;