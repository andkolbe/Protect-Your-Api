import { Query } from '../';
import { CannedResponse, TUsers } from '../models';

const findOneByEmail = (email: string) => Query<TUsers[]>('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);

const findOneById = (id: number) => Query<TUsers[]>('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);

const insert = (newUser: any) => Query<CannedResponse>('INSERT INTO users SET ?', [newUser]);

export default {
    findOneByEmail,
    findOneById,
    insert
}