import EntryDisplayGrid from './components/EntryDisplayGrid/entryDisplayGrid';
import SearchArea from './components/Search/searchArea';

import {pool} from '@/lib/db_pool.js'

export default async function Home() {
  // let result = null;
  //  try {
  //       result = await pool.query('SELECT * FROM music_entries');
  //       console.log('Entries:', result.rows);
  //   } catch (err) {
  //       console.error('Error executing query', err);
  //   }

  return (
    <main className='flex-1 p-5'>
      <SearchArea />
      <EntryDisplayGrid />
    </main>
  );
}
