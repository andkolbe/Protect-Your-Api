import {  Request } from 'express'; // Request = req variable
import { TUsers } from '../db/models';

export interface IPayload {
    [key: string]: any;
    userid?: number;
    unique?: string;
}

export interface ReqUser extends Request {
    // take the Request interface that is already built into express and add our own properties to it
    user?: TUsers & IPayload
    // & means it's a combination of both
    // | means only the intersection between the two
}