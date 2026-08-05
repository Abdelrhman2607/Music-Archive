'use client';

import styles from './FilterPageClient.module.css'
import FilterDisplayGrid from "@/app/components/Filters/FilterDisplayGrid/filterDisplayGrid";
import Searchbar from "@/app/components/Search/searchbar";
import PageNav from "@/app/components/UI/pageNav/pageNav";
import { useEffect, useState } from "react";
import FilterPageHeader from "@/app/components/Filters/FilterPageHeader/filterPageHeader";
import NewFilterInput from "@/app/components/Filters/NewFilterInput/newFilterInput";
import DropdownMenu from "@/app/components/UI/dropdownMenu/dropdownMenu";
import useFilterDropdown from "@/util/useFilterDropdown";
import getPageTotal from "@/data/data_fetching/actions/getPageTotal";


export default function FilterPageClient({ filterType }: { filterType: 'tag' | 'cat' | 'artist' }) {
  const colorClass = {
    'tag': styles.tag,
    'cat': styles.cat,
    'artist': styles.artist
  }

  const [pageTotal, setPageTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(false);

  useEffect(()=>{
    const params = new URLSearchParams({
        table: filterType
      });

    fetch(`/api/getPageTotal/?${params.toString()}`, 
      {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      })
    .then((res) => res.json())
    .then((data) => setPageTotal(data))
  }, [refreshKey])

  const [searchBarValue, setSearchBarValue] = useState('');
  const parentCatFilter = useFilterDropdown();

  const [catOptions, setCatOptions] = useState<string[]>([]);

  useEffect( () => {
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
          setCurrentPage={setCurrentPage}
          pageTotal={pageTotal}
          setPageTotal={setPageTotal}
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