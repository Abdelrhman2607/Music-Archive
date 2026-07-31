'use client';

import { useState } from 'react';
import DropdownMenu from '../UI/dropdownMenu';
import SelectedFilters from '../UI/selectedFilters';
import styles from './entryForm.module.css';

type EntryFormProps = {
  mode: 'new' | 'edit';
  entryId?: number;
};

export default function EntryForm({ mode, entryId }: EntryFormProps) {

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const submission = {
      title: event.target.entryTitle.value,
      tags: selectedTags,
      artists: selectedArtists,
      cat: selectedCat,
      description: event.target.entryDesc.value
    }

    const response = await fetch(
      (mode === 'new' ? '/api/new' : `/api/edit/${entryId}`), 
      {
        method: (mode === 'new' ? 'POST' : `PUT`),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission)
      }
    )
     if (!response.ok) {
      console.error('Request failed');
    }
    else {
      console.log( await response.json());
    }

  }

  const example = ["example", 'tag', 'artist'];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedCat, setSelectedCat] = useState<string[]>([example[0]]);

  return (
    <form className={styles.entryForm} onSubmit={handleSubmit}>
      <div className={styles.textArea}>
        <label className={styles.fieldLabel}>Title:</label>
        <input type='text' name='entryTitle'></input>
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
        }} />
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
        }} />
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

      <div className={styles.selectedCat}>
        {selectedCat}
      </div>

      <div className={styles.textArea} >
        <label className={styles.fieldLabel}>Description:</label>
        <textarea name='entryDesc'></textarea>
      </div>

      <button type='submit' className={styles.submitButton}>Save New Entry</button>
    </form>
  );
}