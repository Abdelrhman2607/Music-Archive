import Link from 'next/link';
import styles from './sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link href={'/'} className={`${styles.topLeftCorner} linearShine`}>
        <p>Sidebar</p>
      </Link>

      <div className={styles.sidebarBase}>

        <Link href={'/new'}><button className={`${styles.newEntryButton} linearShine`}>New Entry</button></Link>

        <div className={styles.dataButtons}>
          <Link href='/artists' className='linearShine'>Artists</Link>
          <Link href='/tags' className='linearShine'>Tags</Link>
          <Link href='/categories' className='linearShine'>Categories</Link>
        </div>

        <div className={styles.import_exportButtons}>
          <button className='linearShine'>Import</button>
          <button className='linearShine'>Export</button>
        </div>

      </div>  
    </div>
  );
}