import {pool} from '../db_pool';

export default async function getEntryCatByID(id, client = null){

    const queryClient = client ?? await pool.connect();
    const queryString =
    `
    SELECT
    name

    FROM categories c 
    JOIN music_entries m ON m.category_id = c.id

    WHERE m.id = $1::int
    `;

    const queryValues = [id];
    let result;
    try{
        result = await queryClient.query(queryString, queryValues);
    }
    catch(error){
        return(undefined)
    }
    finally{
        if (!client) {
            queryClient.release();
        }
    }
    
    const cat = result.rows[0]?.name;

    return(cat);
}
