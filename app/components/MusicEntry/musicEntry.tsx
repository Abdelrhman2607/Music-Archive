
import styles from './musicEntry.module.css';

import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

interface musicEntryData {
  'id': number
  'name': string
  'date-added': Date
  'description': string
  'artists': string[]
  'tags': string[]
  'catPath': string
}

export default function MusicEntry({ musicData }: { musicData: musicEntryData }) {
  return (
    <div className={styles.musicEntry}>

      <div className={styles.entryHeader}>
        <span className={styles.entryName}>{musicData.name}</span>
        <span className={styles.entryCat}>: {musicData.catPath}</span>
        <span className={styles.entryArtists}>{musicData.artists.join(', ')}</span>
      </div>

      <div className={styles.entryBody}>
        <div className={styles.entryBodyTop}>
          <div className={styles.entryTags}>
            {musicData.tags.map((tag) => {
              return (
                <span className={styles.entryTag} key={tag}>{tag}</span>
              );
            })}
          </div>
          <div className={styles.entryControls}>
            <button className={styles.entryEdit}><MdEdit /></button>
            <button className={styles.entryDelete}><MdDeleteForever /></button>
          </div>
        </div>
        <span className={styles.entryDesc}>{musicData.description}</span>
      </div>

    </div>
  );
}
