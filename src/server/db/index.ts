import * as mysql from 'mysql';
import config from '../config';
import accesstokens from './queries/accesstokens';
import blogs from './queries/blogs';
import users from './queries/users';

// node - mysql connection pool
const pool = mysql.createPool(config.mysql); // createPool is easier to scale than createConnection

// reusable query helper method 
export const Query = <T = any>(query: string, values?: any) => {
    return new Promise<T>((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

export default {
    accesstokens,
    blogs,
    users
}