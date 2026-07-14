
import styles from './selectedFilters.module.css';

type SelectedFiltersObject = {
  tags: string[];
  cats: string[];
}

export default function SelectedFilters({ selectedFilters }: { selectedFilters: SelectedFiltersObject }) {
  return (
    <div className={styles.selectedFiltersArea}>
      <div className={styles.selectedTagsArea}>
        {selectedFilters.tags.map((tag, index) => {
          return(<SelectedFilter name = {tag} type={'tag'} />);
          })
        }
      </div>

      <div className={styles.selectedCatsArea}>
        {selectedFilters.cats.map((cat, index) => {
          return(<SelectedFilter name = {cat} type={'cat'} key={index}/>);
          })
        }
      </div>
    </div>
  );
}

function SelectedFilter({ name, type }: { name: string, type: "tag" | "cat" }) {
  return(
    <button className={type == 'tag' ? styles.selectedTag : styles.selectedCat}> 
      {`${name} X`}
    </button>
  );
}