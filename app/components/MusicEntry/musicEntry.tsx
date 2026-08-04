
'use client';

import styles from './musicEntry.module.css';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { MdEdit, MdDeleteForever, MdClose, MdOutlineCheckCircle } from 'react-icons/md';

import { EntryData } from '@/definitions'

export default function MusicEntry({ entryData, onSaveSuccess }: { entryData: EntryData, onSaveSuccess: () => void }) {
  const router = useRouter();
  const [beingDeleted, setBeingDeleted] = useState(false);

  const editButton = beingDeleted ? (
    <button
      type='button'
      className={`${styles.entryEdit} linearShine`}
      onClick={() => setBeingDeleted(false)}
    >
      <MdClose color='black' />
    </button>
  ) : (
    <button
      type='button'
      className={`${styles.entryEdit} linearShine`}
      onClick={() => router.push(`/edit/${entryData.id}`)}
    >
      <MdEdit color='black' />
    </button>
  );

  const deleteButton = beingDeleted ? (
    <button
      type='button'
      className={`${styles.entryDelete} linearShine`}
      onClick={ async () => {
        const res = await fetch(`/api/deleteEntry?id=${entryData.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        setBeingDeleted(false);
        if (res.ok) {
          onSaveSuccess?.();
        }
        else {
          const errorMsg = (await res.json()).error;
          alert(errorMsg);
        }
        setBeingDeleted(false)
      }}
    >
      <MdOutlineCheckCircle color='black' />
    </button>
  ) : (
    <button
      type='button'
      className={`${styles.entryDelete} linearShine`}
      onClick={() => setBeingDeleted(true)}
    >
      <MdDeleteForever color='black' />
    </button>
  );

  return (
    <div className={styles.musicEntry}>

      <div className={styles.entryHeader}>
        <span className={styles.entryName}>{entryData.title}</span>
        <span className={styles.entryCat}>: {entryData.catPath.join(' / ')}</span>
        <span className={styles.entryArtists}>{entryData.artists.join(', ')}</span>
      </div>

      <div className={styles.entryBody}>
        <div className={styles.entryBodyTop}>
          <div className={styles.entryTags}>
            {entryData.tags.map((tag) => {
              return (
                <span className={styles.entryTag} key={tag}>{tag}</span>
              );
            })}
          </div>
          <div className={styles.entryControls}>
            {editButton}
            {deleteButton}
          </div>
        </div>
        <div className={styles.entryBodyBottom}>
          <span className={styles.entryDesc}>{entryData.description}</span>
          <span className={styles.entryDate}>Date added: {new Date(entryData.date_added).toDateString()}</span>
        </div>

      </div>

    </div>
  );
}
