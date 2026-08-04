
import { pool } from '@/data/db_pool';

export default async function createFilter(filterType, value, parentId = null, client = null) {
    const allowedTables = {
        tag: 'tags',
        cat: 'categories',
        artist: 'artists'
    };

    const queryClient = client ?? await pool.connect();
    try {

        const queryString = filterType === 'cat' ?
            `
            INSERT INTO ${allowedTables[filterType]} (name, parent_id) VALUES
            ($1::text, $2::int) 
            `
        :
            `
            INSERT INTO ${allowedTables[filterType]} (name) VALUES
            ($1::text) 
            `

        const queryValues = filterType === 'cat' ? [value, parentId] : [value]
        const result = await queryClient.query(queryString, queryValues);
        return
    }

    catch (error) {
        return(error.code);
    }
    finally {
        if (!client) {
            queryClient.release();
        }
    }
}