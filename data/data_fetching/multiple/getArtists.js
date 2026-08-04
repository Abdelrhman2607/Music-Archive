import { pool } from '../../db_pool';

export default async function getArtists(searchText, client = null) {
  const queryClient = client ?? await pool.connect();
  try {

    let queryString =
      `
      SELECT name FROM artists WHERE name ILIKE $1::text ORDER BY NAME LIMIT 20
      `
    let queryValues = [`%${searchText}%`];

    let result;
    result = await queryClient.query(queryString, queryValues);

    const artists = result.rows.map((object) => (object.name));

    return artists;
  }

  catch (error) {
    console.error(error);
    return ([])
  }
  finally {
    if (!client) {
      queryClient.release();
    }
  }

}