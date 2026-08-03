
import { pool } from '@/data/db_pool';

export default async function createFilter(filterType, value) {
    const allowedTables = {
        tag: 'tags',
        cat: 'categories',
        artist: 'artists'
    };

    const client = await pool.connect();
    try {

        const queryString =
            `
            INSERT INTO ${allowedTables[filterType]} (name) VALUES
            ($1::text) 
            `

        const queryValues = [value]
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