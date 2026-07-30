import {pool} from './db_pool';

export default async function getCatIDByID(id){
    // Entry ID is input
    const queryString = 'SELECT id FROM categories c WHERE c.id = $1::int LIMIT 1';
    const queryValues = [id];

    let result;
    try{
        result = await pool.query(queryString, queryValues);
    }
    catch(error){
        return(undefined)
    }
    

    return(result.rows[0].id);
}
