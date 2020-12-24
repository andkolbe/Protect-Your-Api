import * as express from 'express';
import * as passport from 'passport';
import { ReqUser } from '../../utils/types';

import { createToken } from '../../utils/tokens';

const router = express.Router();

router.post('/', passport.authenticate('local'), async (req: ReqUser, res) => {
    try { // if the username and password match, and it sends back a user, meaning they are logged in, we now have the req.user
        // we will create a token because they are officially logged in
        let token = await createToken({ userid: req.user.id }); // createToken takes a parameter of userid
        res.json({ // we want to send our newly created token, role (default as guest), and userid
            token,
            role: req.user.role,
            userid: req.user.id
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default router;