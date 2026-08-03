
import getPageTotal from '@/data/data_fetching/actions/getPageTotal'
import HomepageClient from './components/HomepageClient';

export default async function Homepage() {
  const pageTotal = await getPageTotal();

  return (
    <main className='flex-1 p-5'>
      <HomepageClient pageTotal={pageTotal}/>
    </main>
  );
}
