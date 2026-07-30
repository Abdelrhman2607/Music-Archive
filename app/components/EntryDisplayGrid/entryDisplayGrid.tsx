
import styles from './entryDisplayGrid.module.css';

import MusicEntry from '../MusicEntry/musicEntry';

import getEntryDataByID from '@/data_fetching/getEntryDataByID';

 
export default async function EntryDisplayGrid(){
    const sampleData = await getEntryDataByID(1) ?? {
    id: 0,
    title: 'No entry available',
    date_added: new Date(),
    description: 'No entry data available.',
    artists: [],
    tags: [],
    catPath: []
    };

    return(
        <div className={styles.entryGrid}>
            <MusicEntry entryData={sampleData} />
            <MusicEntry entryData={sampleData} />
            <MusicEntry entryData={sampleData} />
            <MusicEntry entryData={sampleData} />
            <MusicEntry entryData={sampleData} />
            <MusicEntry entryData={sampleData} />
            <MusicEntry entryData={sampleData} />
            <MusicEntry entryData={sampleData} />
        </div>
    );
}