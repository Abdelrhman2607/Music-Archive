import {pool} from './db_pool';

export default async function getEntryCatByID(id){

    const queryString =
    `
    SELECT
    name

    FROM categories c 
    JOIN music_entries m ON m.category_id = c.id

    WHERE m.id = $1::int
    `;

    const queryValues = [id];

    const client = await pool.connect();
    let result;
    try{
        result = await client.query(queryString, queryValues);
    }
    catch(error){
        return(undefined)
    }

    const cat = result.rows[0].name;

    client.release();

    return(cat);
}
