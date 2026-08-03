import {pool} from '@/data/db_pool';

export default async function getCatIDByCatName(name){

    const queryString = 'SELECT id FROM categories c WHERE c.name = $1::text LIMIT 1';
    const queryValues = [name];

    let result;
    try{
        result = await pool.query(queryString, queryValues);
    }
    catch(error){
        return(undefined)
    }
    console.log(result.rows)
    return(result.rows[0].id);
}
