
import styles from './musicEntry.module.css';

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
            <button className={styles.entryEdit}><MdEdit color='black'/></button>
            <button className={styles.entryDelete}><MdDeleteForever color='black'/></button>
          </div>
        </div>
        <div className={styles.entryBodyBottom}>
          <span className={styles.entryDesc}>{entryData.description}</span>
          <span className={styles.entryDate}>Last Modified: {entryData.date_added.toDateString()}</span>
        </div>
        
      </div>

    </div>
  );
}
