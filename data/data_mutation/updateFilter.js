
import { pool } from '@/data/db_pool';

export default async function updateFilter(filterType, id, value) {
    const allowedTables = {
        tag: 'tags',
        cat: 'categories',
        artist: 'artists'
    };

    const client = await pool.connect();
    try {

        const queryString =
            `
            UPDATE ${allowedTables[filterType]} t
            SET name = $1::text
            WHERE t.id = $2::int 
            `

        const queryValues = [value, id]
        const result = await client.query(queryString, queryValues);
        return
    }

    catch (error) {
        return(error.code);
    }
    finally {
        client.release();
    }
}