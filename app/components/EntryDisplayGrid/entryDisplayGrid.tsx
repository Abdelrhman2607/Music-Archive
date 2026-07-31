'use client';

import styles from './entryDisplayGrid.module.css';

import MusicEntry from '../MusicEntry/musicEntry';

import { EntryData } from '@/definitions';
import { useState, useEffect } from 'react';


export default function EntryDisplayGrid({ currentPage }: { currentPage: number }) {

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
    fetch(`/api?page=${currentPage}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setGridData(data));
  }, [currentPage]);

    return (
        <div className={styles.entryGrid}>
            {gridData.map((entry: EntryData) => { return (<MusicEntry key={entry.id} entryData={entry} />) })}
        </div>
    );
}