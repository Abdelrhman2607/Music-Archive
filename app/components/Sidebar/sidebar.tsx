'use client';

import styles from './sidebar.module.css';

import Link from 'next/link';
import { useRef } from 'react';

export default function Sidebar() {
  const importRef = useRef<HTMLInputElement | null>(null);
  const exportRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className={styles.sidebar}>
      <Link href={'/'} className={`${styles.topLeftCorner} linearShine`}>
        <p>Sidebar</p>
      </Link>

      <div className={styles.sidebarBase}>

        <Link href={'/new'} className={styles.newEntryLink}><button className={`${styles.newEntryButton} linearShine`}>New Entry</button></Link>

        <div className={styles.dataButtons}>
          <Link href='/artists' className='linearShine'>Artists</Link>
          <Link href='/tags' className='linearShine'>Tags</Link>
          <Link href='/categories' className='linearShine'>Categories</Link>
        </div>

        <div className={styles.import_exportButtons}>
          <button
            className='linearShine'
            onClick={() => {
              importRef.current?.click()
            }}
          >
            <input
              type='file'
              ref={importRef}
              className='hidden'
            />
            Import
          </button>
          <button
            className='linearShine'
            onClick={() => {
              exportRef.current?.click()
            }}
          >
            <input
              type='file'
              ref={exportRef}
              className='hidden'
            />
            Export
          </button>
        </div>

      </div>
    </div>
  );
}