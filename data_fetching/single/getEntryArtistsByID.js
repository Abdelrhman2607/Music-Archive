import {pool} from '../db_pool';

export default async function getEntryArtistsByID(id){

    const queryString =
    `
    SELECT
    a.name 

    FROM artists a JOIN artist_entries ae
    ON ae.artist_id = a.id
    
    WHERE ae.entry_id = $1::int
 
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
