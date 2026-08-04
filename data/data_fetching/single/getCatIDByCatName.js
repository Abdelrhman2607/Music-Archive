import {pool} from '@/data/db_pool';

export default async function getCatIDByCatName(name, client = null){

    const queryClient = client ?? await pool.connect();
    const queryString = 'SELECT id FROM categories c WHERE c.name = $1::text LIMIT 1';
    const queryValues = [name];

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
