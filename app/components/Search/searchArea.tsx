'use client';

import styles from './searchArea.module.css';

import Searchbar from './searchbar';
import DropdownMenu from '../UI/dropdownMenu';
import SelectedFilters from './selectedFilters';

import { useState } from 'react';

export default function SearchArea() {
  let tags = ['cat', 'dog', 'fish'];
  let cats = ['fish', 'bird', 'reptile'];

  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);

  return (
    <div className={styles.searchArea}>
      <div className={styles.searchAreaControls}>
        <Searchbar />

        <div className={styles.filterArea}>
          <button className={styles.filterButton} onClick={() => { setTagDropdownOpen(!tagDropdownOpen); }}>
            Filter by Tag
          </button>
          <DropdownMenu
            options={tags}
            isOpen={tagDropdownOpen}
            name={"tagFilter"}
            optionsState={{state: selectedTags, setter: setSelectedTags}}
          />
        </div>

        <div className={styles.filterArea}>
          <button className={styles.filterButton} onClick={() => { setCatDropdownOpen(!catDropdownOpen); }}>
            Filter by Category
          </button>
          <DropdownMenu
            options={cats}
            isOpen={catDropdownOpen}
            name={"catFilter"}
            optionsState={{state: selectedCats, setter: setSelectedCats}}
          />
        </div>

      </div >

      <SelectedFilters
        tags={selectedTags}
        cats={selectedCats}
        onRemoveFilter={(type: 'tag' | 'cat', value: string) => {
          if (type === 'tag'){
            setSelectedTags((prev) => prev.filter((item) => item !== value));
          }
          else{
            setSelectedCats((prev) => prev.filter((item) => item !== value));
          }
        }}
      />

    </div>
  );
}