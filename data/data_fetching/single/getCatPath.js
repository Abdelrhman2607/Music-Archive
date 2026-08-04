import { pool } from '../../db_pool';

export default async function getCatPath(catId, client = null) {
  if (!catId) return [];

  const queryClient = client ?? await pool.connect();
  try {
    const pathString = [];

    const queryString =
      `
    SELECT
    parent_id, name

    FROM categories c 

    WHERE c.id = $1::int
    `

    let currentParentId = catId;

    while (currentParentId) {
      const result = await queryClient.query(queryString, [currentParentId]);
      if (result.rows.length === 0) break;

      const { parent_id, name } = result.rows[0];
      pathString.push(name);
      currentParentId = parent_id;
    }

    return (pathString.reverse());
  }

  finally {
    if (!client) {
      queryClient.release();
    }
  }


}
