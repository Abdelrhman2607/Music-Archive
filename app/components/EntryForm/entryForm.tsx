'use client';

import { useState } from 'react';
import DropdownMenu from '../UI/dropdownMenu';
import SelectedFilters from '../UI/selectedFilters';
import styles from './entryForm.module.css';

export default function NewEntryForm() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedCat, setSelectedCat] = useState<string[]>([]);

  const example = ["example", 'tag', 'artist', 'cat'];

  return (
    <form className={styles.entryForm}>
      <div className={styles.textArea}>
        <label className={styles.fieldLabel}>Title:</label>
        <input type='text'></input>
      </div>

      <div className={styles.dropdownArea}>
        <label className={styles.fieldLabel}>Artists:</label>
        <DropdownMenu
          inputType='checkbox'
          options={example}
          isOpen={true}
          name={"artistSelection"}
          optionsState={{ state: selectedArtists, setter: setSelectedArtists }}
        ></DropdownMenu>
      </div>
      <div className={styles.selectedFilters}>
        <SelectedFilters type='artist' filters={selectedArtists} onRemoveFilter={(value: string) => {
            setSelectedArtists((prev) => prev.filter((item) => item !== value));
        }}/>
      </div>
      

      <div className={styles.dropdownArea}>
        <label className={styles.fieldLabel}>Tags:</label>
        <DropdownMenu
          inputType='checkbox'
          options={example}
          isOpen={true}
          name={"tagSelection"}
          optionsState={{ state: selectedTags, setter: setSelectedTags }}
        ></DropdownMenu>
      </div>
      <div className={styles.selectedFilters}>
        <SelectedFilters type='tag' filters={selectedTags} onRemoveFilter={(value: string) => {
            setSelectedTags((prev) => prev.filter((item) => item !== value));
        }}/>
      </div>
      

      <div className={styles.dropdownArea}>
        <label className={styles.fieldLabel}>Category:</label>
        <DropdownMenu
          inputType='radio'
          options={example}
          isOpen={true}
          name={"catSelection"}
          optionsState={{ state: selectedCat, setter: setSelectedCat }}
        ></DropdownMenu>
      </div>

      <div className={styles.textArea} >
        <label className={styles.fieldLabel}>Description:</label>
        <textarea></textarea>
      </div>

      <button type='submit' className={styles.submitButton}>Save New Entry</button>
    </form>
  );
}