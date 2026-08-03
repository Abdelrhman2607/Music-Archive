
import { pool } from '@/data/db_pool';

export default async function createFilter(filterType, value, parentId = null) {
    const allowedTables = {
        tag: 'tags',
        cat: 'categories',
        artist: 'artists'
    };

    const client = await pool.connect();
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