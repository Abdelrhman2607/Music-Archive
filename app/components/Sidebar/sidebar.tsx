'use client';

import styles from './sidebar.module.css';

import Link from 'next/link';

export default function Sidebar() {

  async function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const importedBackupFile = event.currentTarget.files?.item(0);
    if (!importedBackupFile) return;

    const backupString = await importedBackupFile.text()

    await fetch('/api/backup',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backup: backupString })
      })
      .then()
    console.log('import')
  }

  async function handleExport() {
    const res = await fetch('/api/backup',
      {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      })

    const backupJSON = (await res.json())
    const backupJSONString = JSON.stringify(backupJSON)
    
    const backupFile = new File([backupJSONString], 'music_archive_backup.json', {type: 'application/json'});
    const fileURL = URL.createObjectURL(backupFile);

    const a = document.createElement("a");
    a.href = fileURL;
    a.download = "music_archive_backup.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(fileURL);
  }

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
          <label htmlFor="import-file" className={`${styles.import} linearShine`}>
            Import
          </label>
          <input
            id="import-file"
            type="file"
            onChange={(e) => handleImport(e)}
            className="hidden" 
          />

          <button
            className='linearShine'
            onClick={handleExport}
          >
            Export
          </button>
        </div>

      </div>
    </div>
  );
}