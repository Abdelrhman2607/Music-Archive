
import { pool } from '@/data/db_pool';

export default async function createEntry(entryData) {
    const client = await pool.connect();
    try {

        const queryString =
            `
            INSERT INTO music_entries (title, description, category_id) VALUES
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