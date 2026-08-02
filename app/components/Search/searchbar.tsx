import styles from './searchbar.module.css';

export default function Searchbar({ setSearchBarValue }:
  {
    setSearchBarValue: React.Dispatch<React.SetStateAction<string>>
  }) {

  return (
    <input
      type='text'
      placeholder="Search entries"
      onChange={(event) => {setSearchBarValue(event.target.value)}}
      className={styles.searchbar}
    />
  );
}
