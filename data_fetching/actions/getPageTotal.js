'use server';

import { pool } from '@/data_fetching/db_pool';
import { ENTRIES_PER_PAGE } from '@/data_fetching/multiple/getGridEntries'

export default async function getPageTotal(){
const client = await pool.connect();
  try {

    let queryString =
      `
      SELECT COUNT(*) as total FROM music_entries
      `

    let result;
    result = await client.query(queryString);

    const pageTotal = Math.ceil(parseInt(result.rows[0].total) / 10);
    return pageTotal;
  }

  catch (error) {
    console.error(error);
    return (0)
  }
  finally {
    client.release();
  }
}