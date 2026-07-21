import EntryDisplayGrid from './components/EntryDisplayGrid/entryDisplayGrid';
import SearchArea from './components/Search/searchArea';

export default async function Home() {
  const response = await fetch('http://127.0.0.1:5000/', {method: 'GET'});
  return (
      <main className='flex-1 p-5'>
          <SearchArea />
          <EntryDisplayGrid />
          {response.text()}
      </main>
  );
}
