'use client';

import FilterDisplayGrid from "../FilterDisplayGrid/filterDisplayGrid";
import Searchbar from "../Search/searchbar";
import PageNav from "../UI/pageNav/pageNav";

import { useState } from "react";
import FilterPageHeader from "../FilterPageHeader/filterPageHeader";
import NewFilterInput from "../NewFilterInput/newFilterInput";

export default function FilterPageClient({ pageTotal, filterType }: { pageTotal: number, filterType: 'tag' | 'cat' | 'artist' }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBarValue, setSearchBarValue] = useState('');
    const [refreshKey, setRefreshKey] = useState(false);

  return (
    <main className='flex-1 p-5 h-screen'>
      <FilterPageHeader filterType={filterType} />
      <div className="flex flex-col">
        <NewFilterInput filterType={filterType} onSaveSuccess={() => setRefreshKey(!refreshKey)}/>
        <Searchbar setSearchBarValue={setSearchBarValue} />
      </div>
      
      <FilterDisplayGrid
        currentPage={currentPage}
        pageTotal={pageTotal}
        searchText={searchBarValue}
        filterType={filterType}
        refreshKey={refreshKey}
        setRefreshKey={setRefreshKey} 
      />
      <PageNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageTotal={pageTotal}
      />
    </main>
  );
}