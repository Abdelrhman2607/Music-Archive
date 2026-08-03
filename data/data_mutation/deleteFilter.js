
import { pool } from '@/data/db_pool';

export default async function deleteFilter(filterType, id) {
    const allowedTables = {
        tag: 'tags',
        cat: 'categories',
        artist: 'artists'
    };

    const client = await pool.connect();
    try {

        const queryString =
            `
            DELETE FROM ${allowedTables[filterType]} t
            WHERE t.id = $1::int 
            `

        const queryValues = [id]
        const result = await client.query(queryString, queryValues);
        return
    }

    catch (error) {
        console.error(error);
        return(error.code);
    }
    finally {
        client.release();
    }
}