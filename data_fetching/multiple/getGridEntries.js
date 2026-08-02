import { pool } from '../db_pool';

import getEntryDataByID from '../single/getEntryDataByID'

export const ENTRIES_PER_PAGE = 10

export default async function getGridEntries(pageOffset = 1) {
  const client = await pool.connect();
  try {

    let queryString =
      `
      SELECT id FROM music_entries ORDER BY id LIMIT $1::int OFFSET $2::int
      `
    let queryValues = [ENTRIES_PER_PAGE, (pageOffset - 1) * 10];

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