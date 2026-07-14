'use client';

import styles from './searchArea.module.css';
import Searchbar from './searchbar';
import DropdownMenu from '../UI/dropdownMenu';
import { useState } from 'react';

export default function SearchArea() {
  let tags = ['cat', 'dog'];
  let cats = ['fish', 'bird'];

  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);

  return (
    <div className={styles.searchArea}>
      <Searchbar />

      <button className={styles.filterButton} onClick={() => {setTagDropdownOpen(!tagDropdownOpen);}}> 
      Filter by Tag
      </button>
      <DropdownMenu
      options={tags}
      isOpen={tagDropdownOpen}
      />

      <button className={styles.filterButton} onClick={() => {setCatDropdownOpen(!catDropdownOpen);}}> 
      Filter by Category
      </button>
      <DropdownMenu
      options={cats}
      isOpen={catDropdownOpen}
      />


    </div >

  );
}