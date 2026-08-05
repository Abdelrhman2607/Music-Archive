'use client';

import styles from './filterDisplayGrid.module.css';

import FilterEntry from '@/app/components/Filters/FilterEntry/filterEntry';
import { FilterEntryData } from '@/definitions'
import titleCaseWord from '@/util/titleCaseWord'

import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type FilterDisplayGridProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageTotal: number;
  setPageTotal: React.Dispatch<React.SetStateAction<number>>
  searchText: string;
  filterType: 'tag' | 'cat' | 'artist';
  refreshKey: boolean;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
};

export default function FilterDisplayGrid({ currentPage, setCurrentPage, pageTotal, setPageTotal, searchText, filterType, refreshKey, setRefreshKey }:
  FilterDisplayGridProps
) {
  const [gridData, setGridData] = useState<FilterEntryData[]>([]);

  useEffect(() => {
    if (currentPage <= pageTotal) {
      const params = new URLSearchParams({
        filterType: filterType,
        page: currentPage.toString(),
        target: searchText
      });

      fetch(`/api/get${titleCaseWord(filterType)}Entries?${params.toString()}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.length !== 0){
            setGridData(data);
          }
          else{
            setCurrentPage(prev => Math.max(prev - 1, 1));
          }
        });
    }
  }, [currentPage, pageTotal, searchText, refreshKey]);

  return (
    <div className={styles.entryGrid}>
      {gridData.length === 0
        ? <p className={styles.noEntriesFound}>No entries match search criteria</p>
        : gridData.map((entryData) => {
          return (
            <FilterEntry
              key={entryData.id}
              entryData={entryData}
              filterType={filterType}
              onSaveSuccess={() => setRefreshKey(!refreshKey)}
            />
          )
        })}
    </div>
  );
}