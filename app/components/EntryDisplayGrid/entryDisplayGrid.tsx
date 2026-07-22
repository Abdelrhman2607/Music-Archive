
import styles from './entryDisplayGrid.module.css';

import MusicEntry from '../MusicEntry/musicEntry';

const sampleData = {
  'name': 'Dig Deep',
  'date-added': new Date(),
  'description': 'Megan Hilty song from SMASH!',
  'artists': ['Megan Hilty', 'Singer 2'],
  'tags': ['tag0', 'tag1', 'tag2'],
  'cat': 'SMASH/subcat1'
}

export default function EntryDisplayGrid(){
    
    return(
        <div className={styles.entryGrid}>
            <MusicEntry musicData={sampleData} />
            <MusicEntry musicData={sampleData} />
            <MusicEntry musicData={sampleData} />
        </div>
    );
}