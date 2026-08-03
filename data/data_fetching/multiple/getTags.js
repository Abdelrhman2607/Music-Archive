import { pool } from '../../db_pool';

export default async function getTags(searchText) {
  const client = await pool.connect();
  try {

    let queryString =
      `
      SELECT name FROM tags WHERE name ILIKE $1::text ORDER BY NAME LIMIT 20
      `
    let queryValues = [`%${searchText}%`];

    let result;
    result = await client.query(queryString, queryValues);

    const tags = result.rows.map((object) => (object.name));

    return tags;
  }

  catch (error) {
    console.error(error);
    return ([])
  }
  finally {
    client.release();
  }

}