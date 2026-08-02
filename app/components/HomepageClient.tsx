'use client';

import SearchArea from '@/app/components/Search/searchArea';
import EntryDisplayGrid from '@/app/components/EntryDisplayGrid/entryDisplayGrid';
import PageNav from '@/app/components/UI/pageNav/pageNav';

import { useState } from 'react';
import useFilterDropdown from '@/util/useFilterDropdown';

export default function HomepageClient({ pageTotal }: { pageTotal: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBarValue, setSearchBarValue] = useState('');

  const tagFilter = useFilterDropdown();
  const catFilter = useFilterDropdown();
  const artistFilter = useFilterDropdown();

  const selectedFilters = {
    selectedTags: tagFilter.selected,
    selectedCats: catFilter.selected,
    selectedArtists: artistFilter.selected
  }

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
        pageTotal={pageTotal}
        searchText={searchBarValue}
        selectedFilters={selectedFilters}
      />
      <PageNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageTotal={pageTotal}
      />
    </>);

}