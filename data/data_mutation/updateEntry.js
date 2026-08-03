
import { pool } from '@/data/db_pool';

import getCatIDByCatName from '@/data/data_fetching/single/getCatIDByCatName';
// {
//   id: 2,
//   title: 'Lotus of Haftkarsvar',
//   date_added: 2026-07-29T21:00:00.000Z,
//   description: null,
//   tags: [ 'Happy' ],
//   artists: [ 'HOYO-MiX' ],
//   catPath: [ 'Genshin Impact', 'Trailer' ]
// }
export default async function updateEntry(entryData) {
    const client = await pool.connect();
    try {
        const cat_id = await getCatIDByCatName()
        const queryString =
            `
            UPDATE music_entries m
            SET title = $1::text, description = $2::text
            WHERE t.id = $2::int 
            `

        const queryValues = [value, id]
        const result = await client.query(queryString, queryValues);
        return
    }

    catch (error) {
        console.error(error);
        return
    }
    finally {
        client.release();
        return
    }
}