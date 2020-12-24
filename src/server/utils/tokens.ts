import * as crypto from 'crypto'; // crypto comes built in with node
import * as jwt from 'jsonwebtoken';
import config from '../config';
import db from '../db';
import type { IPayload } from './types';

export const createToken = async (payload: IPayload) => {
    let tokenid: any = await db.accesstokens.insert(payload.userid);
    // tokenid is just the id in the accesstokens table
    payload.accesstokenid = tokenid.insertId;
    payload.unique = crypto.randomBytes(32).toString('hex'); // creates a unique signature we can have on this payload for jwt
    let token = jwt.sign(payload.accesstokenid, config.auth.secret);
    // first parameter is our payload, second is our secret message
    await db.accesstokens.update(payload.accesstokenid, token);
    return token;
}

export const ValidateToken = async (token: string) => {
    let payload: IPayload = <IPayload>jwt.decode(token);
    let [accesstokenid] = await db.accesstokens.findOneByIdAndToken(payload.accesstokenid, token)
    if(!accesstokenid) {
        throw new Error('Invalid Token');
    } else {
        return payload;
    }
}

