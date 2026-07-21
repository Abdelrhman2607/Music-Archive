import styles from './sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.topLeftCorner}>
        <p>Sidebar</p>
      </div>

      <div className={styles.sidebarBase}>
        <div className={styles.dataButtons}>
          <button>Artists</button>
          <button>Tags</button>
          <button>Categories</button>
        </div>

        <div className={styles.import_exportButtons}>
          <button>Import</button>
          <button>Export</button>
        </div>

      </div>  
    </div>
  );
}