import styles from './searchArea.module.css';
import Searchbar from './searchbar';

export default function SearchArea() {
  return (
    <div className={styles.searchArea}>
      <Searchbar />
      <button className={styles.filterButton}>Filter by tag</button>
      <button className={styles.filterButton}>Filter by category</button>
    </div>

  );
}