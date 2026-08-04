import {pool} from '../db_pool';

export default async function getCatIDByID(id, client = null){
    // Entry ID is input
    const queryClient = client ?? await pool.connect();
    const queryString = 'SELECT id FROM categories c WHERE c.id = $1::int LIMIT 1';
    const queryValues = [id];

    let result;
    try{
        result = await queryClient.query(queryString, queryValues);
    }
    catch(error){
        return(undefined)
    }
    finally {
        if (!client) {
            queryClient.release();
        }
    }

    return(result.rows[0]?.id);
}
