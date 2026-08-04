
import { pool } from '@/data/db_pool';
import getCatIDByCatName from '@/data/data_fetching/single/getCatIDByCatName';
import getTagIds from '@/data/data_fetching/multiple/getTagIds';
import getArtistIds from '@/data/data_fetching/multiple/getArtistIds';

// {
//   id: 0,
//   title: 'Lotus of Haftkarsvar',
//   date_added: 2026-07-29T21:00:00.000Z,
//   description: null,
//   tags: [ 'Happy' ],
//   artists: [ 'HOYO-MiX' ],
//   cat: [ 'Category' ] ?? catPath: ['cat', 'subcat']
// }
export default async function createEntry(entryData, client = null) {
    const queryClient = client ?? await pool.connect();
    try {
        await queryClient.query('BEGIN');

        const catName =
            entryData?.cat?.[0] ??
            entryData?.catPath?.[entryData.catPath?.length - 1];
        const catId = await getCatIDByCatName(catName, queryClient);
        const tagIds = await getTagIds(entryData.tags, queryClient);
        const artistIds = await getArtistIds(entryData.artists, queryClient);

        let queryString =
            `
            INSERT INTO music_entries (title, description, category_id) VALUES
            ($1::text, $2::text, $3::int) 

            RETURNING id
            `

        let queryValues = [entryData.title, entryData.description, catId];
        const entryId = (await queryClient.query(queryString, queryValues)).rows[0].id;

        queryString =
            `
            INSERT INTO artist_entries (artist_id, entry_id)
            SELECT artist_id , $1::int 
            FROM UNNEST($2::int[]) AS a(artist_id) 
            `

        queryValues = [entryId, artistIds];
        await queryClient.query(queryString, queryValues);

        queryString =
            `
            INSERT INTO tag_entries (tag_id, entry_id)
            SELECT tag_id , $1::int 
            FROM UNNEST($2::int[]) AS t(tag_id) 
            `

        queryValues = [entryId, tagIds];
        await queryClient.query(queryString, queryValues);
        await queryClient.query('COMMIT')
    }

    catch (error) {
        await queryClient.query('ROLLBACK')
        console.error(error);
        return (error.code);
    }
    finally {
        if (!client) {
            queryClient.release();
        }
    }
}