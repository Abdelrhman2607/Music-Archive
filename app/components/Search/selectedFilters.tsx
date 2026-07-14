
import styles from './selectedFilters.module.css';

import { IoCloseSharp } from "react-icons/io5";

type SelectedFiltersObject = {
  tags: string[];
  cats: string[];
}

export default function SelectedFilters({ selectedFilters }: { selectedFilters: SelectedFiltersObject }) {
  return (
    <div className={styles.selectedFiltersArea}>
      <div className={styles.selectedTagsArea}>
        {selectedFilters.tags.map((tag, index) => {
          return (<SelectedFilter name={tag} type={'tag'} key={index} />);
        })
        }
      </div>

      <div className={styles.selectedCatsArea}>
        {selectedFilters.cats.map((cat, index) => {
          return (<SelectedFilter name={cat} type={'cat'} key={index} />);
        })
        }
      </div>
    </div>
  );
}

function SelectedFilter({ name, type }: { name: string, type: "tag" | "cat" }) {
  return (
    <div className={type == 'tag' ? styles.selectedTag : styles.selectedCat}>
      <span className={styles.SelectedFilterName}>{name}</span>
      <div className={styles.SelectedFilterXButton}>
        <IoCloseSharp />
      </div>
      
    </div>
  );
}