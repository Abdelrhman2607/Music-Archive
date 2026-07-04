import Sidebar from './components/sidebar';

export default function Home() {
  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar/>
      <main>
        <div>
          <h1>
            To get started, edit the page.tsx file.
          </h1>
          <p>
            center.
          </p>
        </div>
      </main>
    </div>
  );
}
