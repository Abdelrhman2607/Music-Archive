
'use client';

import styles from './musicEntry.module.css';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { MdEdit, MdDeleteForever, MdOutlineCheckCircle, MdClose } from 'react-icons/md';

import { EntryData } from '@/definitions'

export default function MusicEntry({ entryData }: { entryData: EntryData }) {
  const router = useRouter();
  const [beingEdited, setBeingEdited] = useState(false);
  const [beingDeleted, setBeingDeleted] = useState(false);

  const editButton = (() => {
    if (beingEdited) {
      return (
        <button
          type='button'
          className={`${styles.entryEdit} linearShine`}
          onClick={() => {
            setBeingEdited(false);
            router.push(`/edit/${entryData.id}`);
          }}
        >
          <MdOutlineCheckCircle color='black' />
        </button>
      );
    }

    if (beingDeleted) {
      return (
        <button
          type='button'
          className={`${styles.entryEdit} linearShine`}
          onClick={() => setBeingDeleted(false)}
        >
          <MdClose color='black' />
        </button>
      );
    }

    return (
      <button
        type='button'
        className={`${styles.entryEdit} linearShine`}
        onClick={() => setBeingEdited(true)}
      >
        <MdEdit color='black' />
      </button>
    );
  })();

  const deleteButton = (() => {
    if (beingEdited) {
      return (
        <button
          type='button'
          className={`${styles.entryDelete} linearShine`}
          onClick={() => setBeingEdited(false)}
        >
          <MdClose color='black' />
        </button>
      );
    }

    if (beingDeleted) {
      return (
        <button
          type='button'
          className={`${styles.entryDelete} linearShine`}
          onClick={() => setBeingDeleted(false)}
        >
          <MdOutlineCheckCircle color='black' />
        </button>
      );
    }

    return (
      <button
        type='button'
        className={`${styles.entryDelete} linearShine`}
        onClick={() => setBeingDeleted(true)}
      >
        <MdDeleteForever color='black' />
      </button>
    );
  })();

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
          <span className={styles.entryDate}>Last Modified: {new Date(entryData.date_added).toDateString()}</span>
        </div>

      </div>

    </div>
  );
}
