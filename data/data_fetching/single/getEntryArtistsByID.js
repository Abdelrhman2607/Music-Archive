import {pool} from '../../db_pool';

export default async function getEntryArtistsByID(id, client = null){

    const queryClient = client ?? await pool.connect();
    const queryString =
    `
    SELECT
    a.name 

    FROM artists a JOIN artist_entries ae
    ON ae.artist_id = a.id
    
    WHERE ae.entry_id = $1::int
 
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
