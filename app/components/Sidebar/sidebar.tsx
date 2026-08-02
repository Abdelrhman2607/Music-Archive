import Link from 'next/link';
import styles from './sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link href={'/'} className={styles.topLeftCorner}>
        <p>Sidebar</p>
      </Link>

      <div className={styles.sidebarBase}>

        <Link href={'/new'}><button className={styles.newEntryButton}>New Entry</button></Link>

        <div className={styles.dataButtons}>
          <Link href='/artists'>Artists</Link>
          <Link href='/tags'>Tags</Link>
          <Link href='/categories'>Categories</Link>
        </div>

        <div className={styles.import_exportButtons}>
          <button>Import</button>
          <button>Export</button>
        </div>

      </div>  
    </div>
  );
}