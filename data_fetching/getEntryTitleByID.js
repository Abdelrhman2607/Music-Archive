import {pool} from './db_pool';

export default async function getEntryTitleByID(id){

    const queryString = 'SELECT title FROM music_entries WHERE id = $1::int LIMIT 1';
    const queryValues = [id];

    let result;
    try{
        result = await pool.query(queryString, queryValues);
    }
    catch(error){
        return(undefined)
    }
    
    return(result.rows[0].title);
}
