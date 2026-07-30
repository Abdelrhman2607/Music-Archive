import { pool } from './db_pool';

export default async function getCatPath(catId) {

  const client = await pool.connect();

  let pathString = [];

  const queryString =
    `
    SELECT
    parent_id, name

    FROM categories c 

    WHERE c.id = $1::int
    `

  let queryValues = [catId];

  let result = await client.query(queryString, queryValues);
  let { parent_id, name } = result.rows[0];
  pathString.push(name);

  while (parent_id) {
    queryValues = [parent_id]
    let result = await client.query(queryString, queryValues);
    let { new_parent_id, name } = result.rows[0];
    parent_id = new_parent_id;
    pathString.push(name);
  }

  client.release();

  return (pathString.reverse());
}
