
import getPageTotal from '@/data_fetching/actions/getPageTotal'
import HomepageClient from './HomepageClient';
import SearchArea from '@/app/components/Search/searchArea';

export default async function Homepage() {
  const pageTotal = await getPageTotal();

  return (
    <main className='flex-1 p-5'>
      <SearchArea />
      <HomepageClient pageTotal={pageTotal}/>
    </main>
  );
}
