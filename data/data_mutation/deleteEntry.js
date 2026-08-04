
import { pool } from '@/data/db_pool';

export default async function deleteEntry(id, client = null) {
    console.log(id)
    const queryClient = client ?? await pool.connect();
    try {
        await queryClient.query('BEGIN');
        const queryString =
            `
            DELETE FROM music_entries
            WHERE id = $1::int 
            `

        const queryValues = [id]
        await queryClient.query(queryString, queryValues);
        await queryClient.query('COMMIT');
        return
    }

    catch (error) {
        await queryClient.query('ROLLBACK');
        console.error(error);
        return
    }
    finally {
        if (!client) {
            queryClient.release();
        }
    }
}