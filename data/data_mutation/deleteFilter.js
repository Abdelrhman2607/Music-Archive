
import { pool } from '@/data/db_pool';

export default async function deleteFilter(filterType, id, client = null) {
    const allowedTables = {
        tag: 'tags',
        cat: 'categories',
        artist: 'artists'
    };

    const queryClient = client ?? await pool.connect();
    try {

        const queryString =
            `
            DELETE FROM ${allowedTables[filterType]} t
            WHERE t.id = $1::int 
            `

        const queryValues = [id]
        const result = await queryClient.query(queryString, queryValues);
        return
    }

    catch (error) {
        console.error(error);
        return(error.code);
    }
    finally {
        if (!client) {
            queryClient.release();
        }
    }
}