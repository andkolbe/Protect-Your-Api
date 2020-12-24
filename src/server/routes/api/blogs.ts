import * as express from 'express';
import db from '../../db';
import { RequestHandler } from 'express-serve-static-core';
import { ReqUser } from '../../utils/types';


const router = express.Router();

const isAdmin: RequestHandler = (req: ReqUser, res, next) => {
    if (!req.user || req.user.role !== 'admin') { // if the req.user doesn't exist or the role isn't admin, send an UNAUTHORIZED error
        return res.sendStatus(401);
    } else {
        return next();
    }
};

router.get('/', async (req, res) => {
    try {
        let blogs = await db.blogs.all();
        res.json(blogs);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.get('/:id', isAdmin, async (req, res) => { // I must be an Admin to view single blogs
    let id = Number(req.params.id);
    try {
        let blog = await db.blogs.one(id);
        res.json(blog);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

export default router;