import SearchArea from './components/Search/searchArea';
import Sidebar from './components/Sidebar/sidebar';


export default function Home() {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <main className='flex-1 p-5'>
        <div>
          <SearchArea />
        </div>
      </main>
    </div>
  );
}
