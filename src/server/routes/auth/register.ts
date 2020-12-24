import * as express from 'express';
import db from '../../db';
import { generateHash } from '../../utils/passwords';
import { createToken } from '../../utils/tokens'; 
// when we register a new user, we also want them to automatically log in, so we need to create a token for them 

const router = express.Router();

// someone is going to fill out a form and submit it to register to a website. Needs to be a post request
router.post('/', async (req, res) => {
    try {
        let userDTO = req.body; // req.body.user is all of the form data the user filled out to send to our website
        userDTO.password = generateHash(userDTO.password); // when the new user registers, override their plain text password with the hashed password
        let result: any = await db.users.insert(userDTO);
        let token = await createToken({ userid: result.insertId }); // create a token the same way as in the login route
        res.json({ 
            token,
            role: 'guest', // always register new users as guest
            userid: result.insertId
        });
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})
    
export default router;