'use client';

import EntryDisplayGrid from '@/app/components/EntryDisplayGrid/entryDisplayGrid';
import SearchArea from '@/app/components/Search/searchArea';
import PageNav from '@/app/components/UI/pageNav/pageNav';

import { useState } from 'react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <main className='flex-1 p-5'>
      <SearchArea />
      <EntryDisplayGrid currentPage={currentPage}/>
      <PageNav 
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      />
    </main>
  );
}
