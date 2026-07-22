
import styles from './musicEntry.module.css';

interface musicEntryData {
  'name': string
  'date-added': Date
  'description': string
  'artists': string[]
  'tags': string[]
  'cat': string
}

export default function MusicEntry({ musicData }: { musicData: musicEntryData }) {
  return (
    <div className={styles.musicEntry}>

      <div className={styles.entryHeader}>
        <span className={styles.entryName}>{musicData.name}</span>
        <span className={styles.entryCat}>{musicData.cat}</span>
        <span className={styles.entryArtists}>{musicData.artists.join(', ')}</span>
      </div>

      <div className={styles.entryBody}>
        <div className={styles.entryBodyInfo}>
          <div className={styles.entryTags}>
            {musicData.tags.map((tag) => {
              return (
                <span className={styles.entryTag} key={tag}>{tag}</span>
              );
            })}
          </div>
          <span className={styles.entryDesc}>{musicData.description}</span>
        </div>
          
        <div className={styles.entryControls}>
          <button className={styles.entryEdit}>Edit</button>
          <button className={styles.entryDelete}>Delete</button>
        </div>
      </div>

    </div>
  );
}
