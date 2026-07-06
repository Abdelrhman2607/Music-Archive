import Sidebar from './components/sidebar';
import Searchbar from './components/searchbar';
import RadioSet from './components/radioSet'

export default function Home() {
  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar />
      <main className='flex-1 p-5'>
        <div>
          <Searchbar />
        </div>
        <RadioSet optionsText={["tag", "Cat", 'date', 'test']}/>
      </main>
    </div>
  );
}
