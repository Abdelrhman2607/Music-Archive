'use client';

import { useState, useEffect } from 'react';
import DropdownMenu from '../UI/dropdownMenu/dropdownMenu';
import SelectedFilters from '../UI/selectedFilters/selectedFilters';
import styles from './entryForm.module.css';

type EntryFormProps = {
  mode: 'new' | 'edit';
  entryId?: number;
};

export default function EntryForm({ mode, entryId }: EntryFormProps) {
  const [tagSearchText, setTagSearchText] = useState('');
  const [catSearchText, setCatSearchText] = useState('');
  const [artistSearchText, setArtistSearchText] = useState('');

  const [tagOptions, setTagOptions] = useState<string[]>([]);
  useEffect(() => {
    fetch(`/api/getTags?target=${tagSearchText}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setTagOptions(data));
  }, [tagSearchText]);

  const [catOptions, setCatOptions] = useState<string[]>([]);
  useEffect(() => {
    fetch(`/api/getCats?target=${catSearchText}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setCatOptions(data));
  }, [catSearchText]);

  const [artistOptions, setArtistOptions] = useState<string[]>([]);
  useEffect(() => {
    fetch(`/api/getCats?target=${catSearchText}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setArtistOptions(data));
  }, [artistSearchText]);

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
      console.log(await response.json());
    }

  }

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedCat, setSelectedCat] = useState<string[]>([catOptions[0]]);

  return (
    <form className={styles.entryForm} onSubmit={handleSubmit}>
      <div className={styles.textArea}>
        <label className={styles.fieldLabel}>Title:</label>
        <input type='text' name='entryTitle' required></input>
      </div>

      <div className={styles.dropdownArea}>
        <label className={styles.fieldLabel}>Artists:</label>
        <DropdownMenu
          inputType='checkbox'
          options={artistOptions}
          isOpen={true}
          name={"artistSelection"}
          optionsState={{ state: selectedArtists, setter: setSelectedArtists }}
          onSearchChange={setArtistSearchText}
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
          options={tagOptions}
          isOpen={true}
          name={"tagSelection"}
          optionsState={{ state: selectedTags, setter: setSelectedTags }}
          onSearchChange={setTagSearchText}
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
          options={catOptions}
          isOpen={true}
          name={"catSelection"}
          optionsState={{ state: selectedCat, setter: setSelectedCat }}
          onSearchChange={setCatSearchText}
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