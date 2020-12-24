import { Query } from '../';
import { CannedResponse, TUsers, TBlogs } from '../models';

const all = () => Query<Array<(TBlogs & TUsers)>>('SELECT blogs.*, users.firstname FROM blogs JOIN users ON users.id = blogs.userid ORDER BY blogs.created_at DESC');
const one = (id: number) => Query<TBlogs[]>('SELECT blogs.*, users.firstname FROM blogs JOIN users ON users.id = blogs.userid WHERE id = ?', [id]);
const insert  = (newBlog: any) => Query<CannedResponse>('INSERT INTO blogs SET ?', newBlog);
const update = (id: number, editedBlog: any) => Query<CannedResponse>('UPDATE blogs SET ? WHERE id = ?', [editedBlog, id]);
const destroy = (id: number) => Query<CannedResponse>('DELETE FROM blogs WHERE id = ?', [id]);

export default {
    all,
    one,
    insert,
    update,
    destroy
}