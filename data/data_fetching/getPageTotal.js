'use server';

import { pool } from '@/data/db_pool';
import { ENTRIES_PER_PAGE } from '@/definitions'

export default async function getPageTotal(table, client = null) {

  const allowedTables = {
    entries: 'music_entries',
    tag:'tags',
    cat: 'categories',
    artist: 'artists'
  };

  const queryClient = client ?? await pool.connect();
  try {

    const queryString =
      `
      SELECT COUNT(*) as total FROM ${allowedTables[table] || 'music_entries'}
      `

    const result = await queryClient.query(queryString);
    const pageTotal = Math.ceil(parseInt(result.rows[0].total) / ENTRIES_PER_PAGE);
    return pageTotal;
  }

  catch (error) {
    console.error(error);
    return (0)
  }
  finally {
    if (!client) {
      queryClient.release();
    }
  }
}