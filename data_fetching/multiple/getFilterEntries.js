
import { pool } from '../db_pool';
import { ENTRIES_PER_PAGE } from '@/definitions';

export default async function getFilterEntries(filterType, pageOffset = 1, target = '') {
    const allowedTables = {
        tag: 'tags',
        cat: 'categories',
        artist: 'artists'
    };

    const client = await pool.connect();
    try {

        let queryString =
            `
            SELECT id, name FROM ${allowedTables[filterType]} WHERE name ILIKE $3::text ORDER BY NAME OFFSET $2::int LIMIT $1::int
            `
        let queryValues = [ENTRIES_PER_PAGE, (pageOffset - 1) * ENTRIES_PER_PAGE, `%${target}%`];

        let result = await client.query(queryString, queryValues);

        return result.rows;
    }

    catch (error) {
        console.error(error);
        return ([])
    }
    finally {
        client.release();
    }

}