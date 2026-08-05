'use client';

import SearchArea from '@/app/components/Search/searchArea';
import EntryDisplayGrid from '@/app/components/MusicEntries/EntryDisplayGrid/entryDisplayGrid';
import PageNav from '@/app/components/UI/pageNav/pageNav';

import { useState, useEffect } from 'react';
import useFilterDropdown from '@/util/useFilterDropdown';
import getPageTotal from "@/data/data_fetching/actions/getPageTotal";

export default function HomepageClient() {
  const [pageTotal, setPageTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBarValue, setSearchBarValue] = useState('');
  const [refreshKey, setRefreshKey] = useState(false);


  const tagFilter = useFilterDropdown();
  const catFilter = useFilterDropdown();
  const artistFilter = useFilterDropdown();

  const selectedFilters = {
    selectedTags: tagFilter.selected,
    selectedCats: catFilter.selected,
    selectedArtists: artistFilter.selected
  }

  useEffect(()=>{
    fetch(`/api/getPageTotal/?table=music_entries`, 
      {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      })
    .then((res) => res.json())
    .then((data) => setPageTotal(data))
  }, [refreshKey])

  return (
    <>
      <SearchArea
        setSearchBarValue={setSearchBarValue}
        tagFilter={tagFilter}
        catFilter={catFilter}
        artistFilter={artistFilter}
      />
      <EntryDisplayGrid
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageTotal={pageTotal}
        setPageTotal={setPageTotal}
        searchText={searchBarValue}
        selectedFilters={selectedFilters}
        refreshKey={refreshKey}
        setRefreshKey={setRefreshKey}
      />
      <PageNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageTotal={pageTotal}
      />
    </>);

}