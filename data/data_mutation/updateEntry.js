import { pool } from '@/data/db_pool';

import getCatIDByCatName from '@/data/data_fetching/single/getCatIDByCatName';
import getTagIds from '@/data/data_fetching/multiple/getTagIds';
import getArtistIds from '@/data/data_fetching/multiple/getArtistIds';

// {
//   id: 2,
//   title: 'Lotus of Haftkarsvar',
//   date_added: 2026-07-29T21:00:00.000Z,
//   description: null,
//   tags: [ 'Happy' ],
//   artists: [ 'HOYO-MiX' ],
//   catPath: [ 'Genshin Impact' ]
// }
export default async function updateEntry(entryData, client = null) {

    const queryClient = client ?? await pool.connect();
    try {
        await queryClient.query('BEGIN');
        const catId = await getCatIDByCatName(entryData.cat[0], queryClient);
        const tagIds = await getTagIds(entryData.tags, queryClient);
        const artistIds = await getArtistIds(entryData.artists, queryClient);

        let queryString =
            `
            UPDATE music_entries
            SET 
            title = $1::text,
            description = $2::text,
            category_id = $3::int
            WHERE id = $4::int
            `

        let queryValues = [entryData.title, entryData.description, catId, entryData.id];
        await queryClient.query(queryString, queryValues);

        queryString = 
            `
            DELETE FROM artist_entries
            WHERE entry_id = $1::int
            `

        queryValues = [entryData.id];
        await queryClient.query(queryString, queryValues);

        queryString = 
            `
            DELETE FROM tag_entries
            WHERE entry_id = $1::int
            `

        queryValues = [entryData.id];
        await queryClient.query(queryString, queryValues);

        queryString = 
             `
            INSERT INTO artist_entries (artist_id, entry_id)
            SELECT artist_id , $1::int 
            FROM UNNEST($2::int[]) AS a(artist_id) 
            `

        queryValues = [entryData.id, artistIds];
        await queryClient.query(queryString, queryValues);

        queryString = 
             `
            INSERT INTO tag_entries (tag_id, entry_id)
            SELECT tag_id , $1::int 
            FROM UNNEST($2::int[]) AS t(tag_id) 
            `

        queryValues = [entryData.id, tagIds];
        await queryClient.query(queryString, queryValues);
        await queryClient.query('COMMIT')
    }

    catch (error) {
        console.error(error);
        return
    }
    finally {
        if (!client) {
            queryClient.release();
        }
    }
}