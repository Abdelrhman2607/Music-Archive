import styles from './searchbar.module.css';

export default function Searchbar() {
  return (
        <input type='text' placeholder="Search entries" className={styles.searchbar}/>
  );
}
