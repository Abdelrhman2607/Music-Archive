import EntryDisplayGrid from './components/EntryDisplayGrid/entryDisplayGrid';
import SearchArea from './components/Search/searchArea';

export default async function Home() {

  return (
    <main className='flex-1 p-5'>
      <SearchArea />
      <EntryDisplayGrid />
    </main>
  );
}
