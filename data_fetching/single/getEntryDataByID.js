import { pool } from '../db_pool';
import getEntryTagsByID from './getEntryTagsByID';
import getEntryArtistsByID from './getEntryArtistsByID';
import getCatPath from './getCatPath';

export default async function getEntryByID(id) {
  const client = await pool.connect();
  try {
    const queryString = `
        SELECT 

        *
        FROM music_entries 

        WHERE id = $1::int
        LIMIT 1
        `;
    const queryValues = [id];

    const entryObject = (await client.query(queryString, queryValues)).rows[0];

    if (!entryObject) {
      return ({
        id: 0,
        title: 'No entry available',
        date_added: new Date(),
        description: 'No entry data available.',
        artists: [],
        tags: [],
        catPath: []
      })
    }

    const tags = await getEntryTagsByID(id);
    const artists = await getEntryArtistsByID(id);

    const catPath = (await getCatPath(entryObject.category_id)) || [];

    entryObject.tags = tags;
    entryObject.artists = artists;
    entryObject.catPath = catPath;

    const result = {
            ...entryObject,
            tags: tags ?? [],
            artists: artists ?? [],
            catPath: catPath
        };

    delete result.category_id;
    return (result);
  }

  finally {
    client.release();
  }
}

//   'id': number
//   'title': string
//   'date-added': Date
//   'description': string
//   'artists': string[]
//   'tags': string[]
//   'catPath': string[]