import { pool } from '@/data/db_pool';

export default async function getTagIds(tags, client = null) {
  const queryClient = client ?? await pool.connect();
  try {

    let queryString =
      `
      SELECT id FROM tags t 
      JOIN UNNEST($1::TEXT[]) AS u(tag_name)
      ON t.name = u.tag_names
      `
    let queryValues = [tags];

    let result;
    result = await queryClient.query(queryString, queryValues);

    const tagIds = result.rows.map((object) => (object.id));

    return tagIds;
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