'use server';

import { pool } from '@/data_fetching/db_pool';
import { ENTRIES_PER_PAGE } from '@/definitions'

export default async function getPageTotal(table) {

  const allowedTables = {
    tags:'tags',
    cats: 'categories',
    artists: 'artists'
  };

  const client = await pool.connect();
  try {

    const queryString =
      `
      SELECT COUNT(*) as total FROM ${allowedTables[table] || 'music_entries'}
      `

    const result = await client.query(queryString);

    const pageTotal = Math.ceil(parseInt(result.rows[0].total) / ENTRIES_PER_PAGE);
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