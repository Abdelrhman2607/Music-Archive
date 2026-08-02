
import styles from './musicEntry.module.css';

import Link from 'next/link';

import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

import { EntryData } from '@/definitions'

export default function MusicEntry({ entryData }: { entryData: EntryData }) {
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
            <Link href={`/edit/${entryData.id}`} className={`${styles.entryEdit} linearShine`}><MdEdit color='black'/></Link>
            <button className={`${styles.entryDelete} linearShine`}><MdDeleteForever color='black'/></button>
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
