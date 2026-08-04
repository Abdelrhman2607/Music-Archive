import {pool} from '../../db_pool';

export default async function getEntryTagsByID(id, client = null){

    const queryClient = client ?? await pool.connect();
    const queryString =
    `
    SELECT
    t.name 

    FROM tags t JOIN tag_entries te
    ON te.tag_id = t.id
    
    WHERE te.entry_id = $1::int
 
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
    

    return(result.rows.map((object) => (object.name)));
}
