
import styles from './selectedFilters.module.css';

import { IoCloseSharp } from "react-icons/io5";

export default function SelectedFilters({
  type,
  filters,
  onRemoveFilter
}: {
  type: 'tag' | 'cat' | 'artist',
  filters: string[],
  onRemoveFilter: (value: string) => void
}) {

  function SelectedFilter({ name, type }: { name: string, type: 'tag' | 'cat' | 'artist' }) {
    const wrapperClass = type === 'tag' ? styles.selectedTag : type === 'artist' ? styles.selectedArtist: styles.selectedCat;

    return (
      <div className={wrapperClass}>
        <span className={styles.SelectedFilterName}>{name}</span>
        <button 
          className={styles.SelectedFilterXButton} 
          onClick={() => onRemoveFilter(name)}
        >
          <IoCloseSharp color='black'/>
        </button>

      </div>
    );
  }

  const wrapperClass = type === 'tag' ? styles.selectedTagsArea : type === 'artist' ? styles.selectedArtistsArea : styles.selectedCatsArea;
  return (
    <div className={styles.selectedFiltersArea}>
      <div className={wrapperClass}>
        {filters.map((filter: string) => {
          return (<SelectedFilter name={filter} type={type} key={filter} />);
        })
        }
      </div>
    </div>
  );
}

