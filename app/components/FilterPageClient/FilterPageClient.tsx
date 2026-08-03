'use client';

import styles from './FilterPageClient.module.css'
import FilterDisplayGrid from "../FilterDisplayGrid/filterDisplayGrid";
import Searchbar from "../Search/searchbar";
import PageNav from "../UI/pageNav/pageNav";

import { useEffect, useState } from "react";
import FilterPageHeader from "../FilterPageHeader/filterPageHeader";
import NewFilterInput from "../NewFilterInput/newFilterInput";
import DropdownMenu from "../UI/dropdownMenu/dropdownMenu";
import useFilterDropdown from "@/util/useFilterDropdown";

export default function FilterPageClient({ pageTotal, filterType }: { pageTotal: number, filterType: 'tag' | 'cat' | 'artist' }) {
  const colorClass = {
    'tag': styles.tag,
    'cat': styles.cat,
    'artist': styles.artist
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [searchBarValue, setSearchBarValue] = useState('');
  const parentCatFilter = useFilterDropdown();
  const [refreshKey, setRefreshKey] = useState(false);

  const [catOptions, setCatOptions] = useState<string[]>([]);

  useEffect(() => {
    if (filterType !== 'cat') {
      return;
    }

    fetch(`/api/getCats?target=${parentCatFilter.searchText}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setCatOptions(data)
      });
  }, [parentCatFilter.searchText, refreshKey]);

  useEffect(() => {
    if (filterType === 'cat') {
      parentCatFilter.setIsOpen(true);
    }
  }, [parentCatFilter.setIsOpen]);

  return (
    <main className='flex-1 p-5 h-screen'>
      <FilterPageHeader filterType={filterType} />
      <div className="flex flex-col">
        <div className={styles.inputArea}>
          {filterType === 'cat' ?
            <div className={styles.catParentInput}>
              <NewFilterInput filterType={filterType} parentCat={parentCatFilter.selected[0]} onSaveSuccess={() => setRefreshKey(!refreshKey)} />
              <h3 className={styles.catParentMsg}>Select Parent Category: </h3>
              <DropdownMenu
                name="parentCatSelection"
                options={catOptions}
                isOpen={parentCatFilter.isOpen}
                inputType="radio"
                optionsState={{ state: parentCatFilter.selected, setter: parentCatFilter.setSelected }}
                onSearchChange={parentCatFilter.setSearchText}
              />
            </div>
            :
            <NewFilterInput filterType={filterType} onSaveSuccess={() => setRefreshKey(!refreshKey)} />
          }
          <div className={`${styles.lineSeparator} ${colorClass[filterType]}`}></div>
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
      </div>
    </main>
  );
}