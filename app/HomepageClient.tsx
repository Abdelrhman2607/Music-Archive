'use client';

import EntryDisplayGrid from '@/app/components/EntryDisplayGrid/entryDisplayGrid';
import PageNav from '@/app/components/UI/pageNav/pageNav';

import { useState } from 'react';

export default function HomepageClient({pageTotal}: {pageTotal: number}) {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <EntryDisplayGrid
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageTotal={pageTotal}
      />
      <PageNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageTotal={pageTotal}
      />
    </>);

}