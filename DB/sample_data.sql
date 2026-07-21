/* Windows command to run in psql shell: \i 'D:/Music-Archive/backend/DB/sample_data.sql' */

\c music_archive;

INSERT INTO music_entries (name) VALUES
    ('Escape from the City'),('Lotus of Haftkarsvar'),('Dig Deep');

INSERT INTO artists (name) VALUES
    ('HOYO-MiX'),('Megan Hilty');

INSERT INTO categories (name) VALUES
    ('Genshin Impact'), ('Sonic'), ('SMASH');

INSERT INTO categories (name, parent_id) VALUES
    ('Trailer', (SELECT id FROM categories WHERE name = 'Genshin Impact'));

INSERT INTO tags (name) VALUES
    ('Calm'), ('Exciting'), ('Scary'), ('Happy');


INSERT INTO tag_entries (tag_id, entry_id) VALUES
    (1,2), (2,1), (4,2), (4,3);

INSERT INTO artist_entries (artist_id, entry_id) VALUES
    (1,2), (2,3);

INSERT INTO category_entries (category_id, entry_id) VALUES
    (1, 2);