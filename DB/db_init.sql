/* Windows command to run in psql shell: \i 'D:/Music-Archive/backend/DB/db_init.sql' */

DROP DATABASE IF EXISTS music_archive;
CREATE DATABASE music_archive;
\c music_archive;

DROP TABLE IF EXISTS categories;
CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE DEFAULT 'Unnamed category',
    parent_id INT DEFAULT NULL REFERENCES categories(id)
);

DROP TABLE IF EXISTS music_entries;
CREATE TABLE music_entries(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL DEFAULT 'Unnamed entry',
    date_added DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT,
    category_id INT NOT NULL REFERENCES categories(id)
    ON DELETE RESTRICT
);

DROP TABLE IF EXISTS tags;
CREATE TABLE tags(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE DEFAULT 'Unnamed tag'
);

DROP TABLE IF EXISTS tag_entries;
CREATE TABLE tag_entries(
    tag_id INT NOT NULL REFERENCES tags(id)
    ON DELETE CASCADE,

    entry_id INT NOT NULL REFERENCES music_entries(id)
    ON DELETE CASCADE,

    PRIMARY KEY (tag_id, entry_id)
);

DROP TABLE IF EXISTS artists;
CREATE TABLE artists(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE DEFAULT 'Unnamed Artist'
);

DROP TABLE IF EXISTS artist_entries;
CREATE TABLE artist_entries(
    artist_id INT NOT NULL REFERENCES artists(id)
    ON DELETE CASCADE,

    entry_id INT NOT NULL REFERENCES music_entries(id)
    ON DELETE CASCADE,

    PRIMARY KEY (artist_id, entry_id)
);




