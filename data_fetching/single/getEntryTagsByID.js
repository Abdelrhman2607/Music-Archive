import {pool} from '../db_pool';

export default async function getEntryTagsByID(id){

    const queryString =
    `
    SELECT
    t.name 

    FROM tags t JOIN tag_entries te
    ON te.tag_id = t.id
    
    WHERE te.entry_id = $1::int
 
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
    finally{
        client.release();
    }
    

    return(result.rows.map((object) => (object.name)));
}
