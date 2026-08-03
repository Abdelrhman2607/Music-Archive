
import { pool } from '@/data/db_pool';

export default async function deleteEntry(id) {

    const client = await pool.connect();
    try {

        const queryString =
            `
            DELETE FROM music_entries
            WHERE id = $1::int 
            `

        const queryValues = [id]
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