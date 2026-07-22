
import styles from './entryDisplayGrid.module.css';

import MusicEntry from '../MusicEntry/musicEntry';

const sampleData = {
  'id': 1,
  'name': 'Dig Deep',
  'date-added': new Date(),
  'description': 'Megan Hilty song from SMASH!',
  'artists': ['Megan Hilty', 'Singer 2'],
  'tags': ['tag0', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'loooooooooooooongtag'],
  'catPath': 'SMASH/subcat1/subcat2/subcat3'
}

export default function EntryDisplayGrid(){
    
    return(
        <div className={styles.entryGrid}>
            <MusicEntry musicData={sampleData} />
            <MusicEntry musicData={sampleData} />
            <MusicEntry musicData={sampleData} />
            <MusicEntry musicData={sampleData} />
            <MusicEntry musicData={sampleData} />
            <MusicEntry musicData={sampleData} />
            <MusicEntry musicData={sampleData} />
            <MusicEntry musicData={sampleData} />
        </div>
    );
}