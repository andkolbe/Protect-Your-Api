export interface TUsers {
    id?: number;
    email?: string;
    firstname?: string;
    lastname?: string;
    password?: string;
    role?: string;
    created_at?: Date;
}

export interface TBlogs {
    id?: number;
    title?: string;
    content?: string;
    userid?: string;
    created_at?: Date;
}

export interface CannedResponse {
    insertId?: number;
    affectedRows?: number;
    changedRows?: number;
}

// acts as psuedo documentation. Write the tables in the code so you don't have to jump back to database to remember table and column names
// we can add these to our queries for typescript support
// the properties are optional because we don't usually select all of them
// you can interface or type to describe them. interfaces can meld or union with other interfaces