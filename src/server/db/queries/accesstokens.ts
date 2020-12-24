import { Query } from '../';

const findOneByIdAndToken = (id: number, token: string) => Query('SELECT * FROM accesstokens WHERE id = ? AND token = ?', [id, token]);

const insert = (userid: number) => Query('INSERT INTO accesstokens (userid) VALUES ?', [userid]);

const update = (id: number, token: string) => Query('UPDATE accesstokens SET ? WHERE id = ?', [token, id]);

export default {
    findOneByIdAndToken,
    insert,
    update
}