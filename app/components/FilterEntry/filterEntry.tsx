
import styles from './filterEntry.module.css';

import Link from 'next/link';

import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

import { FilterEntryData } from '@/definitions'

export default function FilterEntry({ entryData }: { entryData: FilterEntryData }) {
  return (
    <div className={styles.musicEntry}>

      <div className={styles.entryHeader}>
        <span className={styles.entryName}>{entryData.name}</span>
      </div>

      <div className={styles.entryBody}>
        <div className={styles.entryBodyTop}>
          <div className={styles.entryControls}>
            <Link href={`/edit/${entryData.id}`} className={`${styles.entryEdit} linearShine`}><MdEdit color='black'/></Link>
            <button className={`${styles.entryDelete} linearShine`}><MdDeleteForever color='black'/></button>
          </div>
        </div>
        <div className={styles.entryBodyBottom}>
        </div>
        
      </div>

    </div>
  );
}
