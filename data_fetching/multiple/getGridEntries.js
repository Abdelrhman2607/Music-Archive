import { pool } from '../db_pool';

import getEntryDataByID from '../single/getEntryDataByID'

export default async function getGridEntries(pageOffset = 0) {
  const client = await pool.connect();
  try {

    let queryString =
      `
      SELECT id FROM music_entries ORDER BY id LIMIT 10 OFFSET $1::int
      `
    let queryValues = [pageOffset * 10];

    let result;
    result = await client.query(queryString, queryValues);

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