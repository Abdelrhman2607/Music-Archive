'use client';

import styles from './searchArea.module.css';

import Searchbar from './searchbar';
import DropdownMenu from '../UI/dropdownMenu';
import SelectedFilters from './selectedFilters';

import { useState } from 'react';

export default function SearchArea() {
  let tags = ['cat', 'dog', 'cat', 'dog', 'cat', 'dog', 'cat', 'dog','cat', 'dog', 'cat', 'dog', 'cat', 'dog', 'cat', 'dog', 'fish', 'fish', 'fish', 'fish', 'fish', 'fish', 'fish', 'fish', 'fish', 'fish', 'fish', 'fish', 'fish', 'fish'];
  let cats = ['fish', 'bird', 'reptile'];

  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);

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
          />
        </div>

      </div >

      <SelectedFilters selectedFilters={{tags: tags, cats: cats}}/>

    </div>
  );
}