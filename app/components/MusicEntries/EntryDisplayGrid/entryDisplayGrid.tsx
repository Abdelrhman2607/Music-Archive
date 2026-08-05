'use client';

import styles from './entryDisplayGrid.module.css';

import MusicEntry from '@/app/components/MusicEntries/MusicEntry/musicEntry';

import { EntryData } from '@/definitions';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type EntryDisplayGridProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageTotal: number;
  setPageTotal: React.Dispatch<React.SetStateAction<number>>;
  searchText: string;
  selectedFilters: {
    selectedTags: string[], selectedCats: string[], selectedArtists: string[]
  };
  refreshKey: boolean;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EntryDisplayGrid({ currentPage, setCurrentPage, pageTotal, setPageTotal, searchText, selectedFilters, refreshKey, setRefreshKey }:
  EntryDisplayGridProps
) {
  const [gridData, setGridData] = useState<EntryData[]>([
    {
      id: 0,
      title: 'No entry available',
      date_added: new Date(),
      description: 'No entry data available.',
      artists: [],
      tags: [],
      catPath: []
    }
  ]);
  useEffect(()=> {
    if (currentPage <= pageTotal) {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        target: searchText,
        tags: selectedFilters.selectedTags.join(","),
        cats: selectedFilters.selectedCats.join(","),
        artists: selectedFilters.selectedArtists.join(","),
      });

      fetch(`/api/getGridEntries?${params.toString()}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length !== 0){
            setGridData(data);
          }
          else{
            setCurrentPage(prev => Math.max(prev - 1, 1));
          }
        });
    }
  }, [currentPage, searchText, selectedFilters, refreshKey]);

  return (
    <div className={styles.entryGrid}>
      {gridData.length === 0
        ? <p className={styles.noEntriesFound}>No entries match search criteria</p>
        : gridData.map((entry: EntryData) => {
          return (
            <MusicEntry
              key={entry.id}
              entryData={entry}
              onSaveSuccess={() => { setRefreshKey(!refreshKey) }}
            />
          )
        })}
    </div>
  );
}