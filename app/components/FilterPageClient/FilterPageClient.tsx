'use client';

import FilterDisplayGrid from "../FilterDisplayGrid/filterDisplayGrid";
import Searchbar from "../Search/searchbar";
import PageNav from "../UI/pageNav/pageNav";

import { useState } from "react";
import FilterPageHeader from "../FilterPageHeader/filterPageHeader";

export default function FilterPageClient({ pageTotal, filterType }: { pageTotal: number, filterType: 'tag' | 'cat' | 'artist' }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBarValue, setSearchBarValue] = useState('');

  return (
    <main className='flex-1 p-5 h-screen'>
      <FilterPageHeader filterType={filterType} />
      <Searchbar setSearchBarValue={setSearchBarValue} />
      <FilterDisplayGrid
        currentPage={currentPage}
        pageTotal={pageTotal}
        searchText={searchBarValue}
        filterType={filterType} />
      <PageNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageTotal={pageTotal}
      />
    </main>
  );
}