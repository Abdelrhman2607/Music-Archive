
import styles from './selectedFilters.module.css';

import { IoCloseSharp } from "react-icons/io5";

export default function SelectedFilters({
  tags,
  cats,
  onRemoveFilter
}: {
  tags: string[],
  cats: string[],
  onRemoveFilter: (type: 'tag' | 'cat', value: string) => void
}) {
  function SelectedFilter({ name, type }: { name: string, type: "tag" | "cat" }) {
    return (
      <div className={type == 'tag' ? styles.selectedTag : styles.selectedCat}>
        <span className={styles.SelectedFilterName}>{name}</span>
        <button 
          className={styles.SelectedFilterXButton} 
          onClick={() => onRemoveFilter(type, name)}
        >
          <IoCloseSharp />
        </button>

      </div>
    );
  }

  return (
    <div className={styles.selectedFiltersArea}>
      <div className={styles.selectedTagsArea}>
        {tags.map((tag: string) => {
          return (<SelectedFilter name={tag} type={'tag'} key={tag} />);
        })
        }
      </div>

      <div className={styles.selectedCatsArea}>
        {cats.map((cat: string) => {
          return (<SelectedFilter name={cat} type={'cat'} key={cat} />);
        })
        }
      </div>
    </div>
  );
}

