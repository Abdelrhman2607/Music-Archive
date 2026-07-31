'use client';

import styles from './searchArea.module.css';

import Searchbar from './searchbar';
import DropdownMenu from '../UI/dropdownMenu/dropdownMenu';
import SelectedFilters from '../UI/selectedFilters/selectedFilters';

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
            inputType='checkbox'
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
            inputType='checkbox'
            options={cats}
            isOpen={catDropdownOpen}
            name={"catFilter"}
            optionsState={{state: selectedCats, setter: setSelectedCats}}
          />
        </div>

      </div >

      <SelectedFilters
        type='tag'
        filters={selectedTags}
        onRemoveFilter={(value: string) => {
            setSelectedTags((prev) => prev.filter((item) => item !== value));
        }}
      />
      <SelectedFilters
        type='cat'
        filters={selectedCats}
        onRemoveFilter={(value: string) => {
            setSelectedCats((prev) => prev.filter((item) => item !== value));
        }}
      />
      
    </div>
  );
}