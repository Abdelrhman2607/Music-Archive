import {pool} from './db_pool';
import getEntryTagsByID from './getEntryTagsByID';
import getEntryArtistsByID from './getEntryArtistsByID';
import getCatPath from './getCatPath';

export default async function getEntryByID(id){
    const client = await pool.connect();

    const entry_object = (await client.query(`
        SELECT 

        *
        FROM music_entries 

        WHERE id = ${id} 
        LIMIT 1
        `)
    ).rows[0];

    const tags = await getEntryTagsByID(id);
    const artists = await getEntryArtistsByID(id);

    const catPath = await getCatPath(entry_object.category_id);

    entry_object.tags = tags;
    entry_object.artists = artists;
    entry_object.catPath = catPath;

    delete entry_object.category_id;

    client.release();

    return(entry_object);
}


//   'id': number
//   'title': string
//   'date-added': Date
//   'description': string
//   'artists': string[]
//   'tags': string[]
//   'catPath': string[]