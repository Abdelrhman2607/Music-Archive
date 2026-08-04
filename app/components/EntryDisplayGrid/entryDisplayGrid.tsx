'use client';

import styles from './entryDisplayGrid.module.css';

import MusicEntry from '../MusicEntry/musicEntry';

import { EntryData } from '@/definitions';
import { useState, useEffect } from 'react';

type EntryDisplayGridProps = {
  currentPage: number;
  pageTotal: number;
  searchText: string;
  selectedFilters: {
    selectedTags: string[], selectedCats: string[], selectedArtists: string[]
  };
};

export default function EntryDisplayGrid({ currentPage, pageTotal, searchText, selectedFilters }:
  EntryDisplayGridProps
) {
  const [refreshKey, setRefreshKey] = useState(false);
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

  useEffect(() => {
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
        .then((data) => setGridData(data));
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