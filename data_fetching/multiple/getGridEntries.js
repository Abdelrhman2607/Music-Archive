import { pool } from '../db_pool';

import getEntryDataByID from '../single/getEntryDataByID'

export const ENTRIES_PER_PAGE = 10

export default async function getGridEntries(pageOffset = 1, target = '', tags = [], cats = [], artists = []) {
  const client = await pool.connect();
  try {

    const queryString =
      `
        SELECT m.id 
        FROM music_entries m 
        JOIN categories c ON c.id = m.category_id 
        WHERE m.title ILIKE $3
        AND (
          cardinality($4::text[]) = 0       /*Make empty filter lists match anything */
          OR c.name = ANY($4)
        )
        
        AND (
          cardinality($5::text[]) = 0
          OR EXISTS (                       /*Check if this entry id matches any of tag/artist ids selected*/
            SELECT 1
            FROM tag_entries te
            JOIN tags t ON t.id = te.tag_id
            WHERE te.entry_id = m.id
              AND t.name = ANY($5)

            GROUP BY te.entry_id
            HAVING COUNT(DISTINCT t.name) = cardinality($5::text[])       
            /*Make the filtering more exclusive by checking that it matches all the tags/artists selected rather than at least one of them*/
          )
        )

        AND (
          cardinality($6::text[]) = 0
          OR EXISTS (
            SELECT 1
            FROM artist_entries ae
            JOIN artists a ON a.id = ae.artist_id
            WHERE ae.entry_id = m.id
              AND a.name = ANY($6)

            GROUP BY ae.entry_id
            HAVING COUNT(DISTINCT a.name) = cardinality($6::text[])
          )
        )

        ORDER BY id 
        LIMIT $1
        OFFSET $2
      `
    const queryValues = [ENTRIES_PER_PAGE, (pageOffset - 1) * 10, `%${target}%`, cats, tags, artists];

    const result = await client.query(queryString, queryValues);

    const entryIds = result.rows.map((object) => (object.id));
    const entriesData = await Promise.all(
      entryIds.map((id) => getEntryDataByID(id))
    );

    return entriesData;
  }

  catch (error) {
    console.error(error);
    return ([])
  }
  finally {
    client.release();
  }

}
