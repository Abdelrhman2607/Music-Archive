'use client';

import FilterDisplayGrid from "../components/FilterDisplayGrid/filterDisplayGrid";
import Searchbar from "../components/Search/searchbar";
import PageNav from "../components/UI/pageNav/pageNav";

import { useState } from "react";

export default function FilterPageClient({ pageTotal, filterType }: { pageTotal: number, filterType: 'tag' | 'cat' | 'artist' }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBarValue, setSearchBarValue] = useState('');

  return (
    <main className='flex-1 p-5'>
      <Searchbar setSearchBarValue={setSearchBarValue} />
      <FilterDisplayGrid
        currentPage={currentPage}
        pageTotal={pageTotal}
        searchText={searchBarValue}
        filterType={filterType} />
      <PageNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageTotal={pageTotal} />
    </main>
  );
}