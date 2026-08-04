import { pool } from '@/data/db_pool';

export default async function getArtistIds(artists, client = null) {
  const queryClient = client ?? await pool.connect();
  try {

    let queryString =
      `
      SELECT id FROM artists a 
      JOIN UNNEST($1::text[]) AS u(artist_name)
      ON a.name = u.artist_name
      `
    let queryValues = [artists];

    let result;
    result = await queryClient.query(queryString, queryValues);

    const artistIds = result.rows.map((object) => (object.id));

    return artistIds;
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