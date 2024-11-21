const Database = require('better-sqlite3');

const db = new Database('database.db', { verbose: console.log });


db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        surname TEXT,
        age INTEGER,
        bio TEXT
    )
`);
db.exec(`
    CREATE TABLE IF NOT EXISTS emotions (
        id_emotion INTEGER ,
        userId INTEGER NOT NULL,
        color TEXT,
        shape TEXT,
        movement TEXT,
        size TEXT,
        id INTEGER,
        CONSTRAINT id_em PRIMARY KEY (id_emotion),
        CONSTRAINT Id_FK FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE
    )
`);
module.exports = db;
