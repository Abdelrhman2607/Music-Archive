'use client';

import { useState, useEffect, use } from 'react';
import useFilterDropdown from '@/util/useFilterDropdown';

import DropdownMenu from '../UI/dropdownMenu/dropdownMenu';
import SelectedFilters from '../UI/selectedFilters/selectedFilters';
import styles from './entryForm.module.css';

type EntryFormProps = {
  mode: 'new' | 'edit';
  entryId?: number;
};

export default function EntryForm({ mode, entryId }: EntryFormProps) {
  const [entryFound, setEntryFound] = useState(false);
  const [entryTitle, setEntryTitle] = useState('');
  const [entryDesc, setEntryDesc] = useState('');

  const tagFilter = useFilterDropdown();
  const catFilter = useFilterDropdown();
  const artistFilter = useFilterDropdown();

  // Prepopulate entry edit forms
  if (mode === 'edit') {
    useEffect(() => {
      fetch(`/api/edit/${entryId}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((entryData) => {
          if (entryData.id){
            setEntryFound(true);
            tagFilter.setSelected(entryData.tags)
            catFilter.setSelected([entryData.catPath[0]])
            artistFilter.setSelected(entryData.artists)
            setEntryTitle(entryData.title)
            setEntryDesc(entryData.description)
          }
        })
    }, []);
  }

  const [tagOptions, setTagOptions] = useState<string[]>([]);
  useEffect(() => {
    fetch(`/api/getTags?target=${tagFilter.searchText}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setTagOptions(data));
  }, [tagFilter.searchText]);

  const [catOptions, setCatOptions] = useState<string[]>([]);
  useEffect(() => {
    fetch(`/api/getCats?target=${catFilter.searchText}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setCatOptions(data);

        // default chosen category will load a green stub if it renders before options are ready
        if (data.length > 0 && catFilter.selected.length === 0) {
          catFilter.setSelected([data[0]]);
        }
      })
  }, [catFilter.searchText]);

  const [artistOptions, setArtistOptions] = useState<string[]>([]);
  useEffect(() => {
    fetch(`/api/getArtists?target=${artistFilter.searchText}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setArtistOptions(data));
  }, [artistFilter.searchText]);

  // initial states / entryForm special cases
  useEffect(() => {
    tagFilter.setIsOpen(true);
    artistFilter.setIsOpen(true);
    catFilter.setIsOpen(true);

  }, [])


  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const submission = {
      title: event.target.entryTitle.value,
      tags: tagFilter.selected,
      artists: artistFilter.selected,
      cat: catFilter.selected,
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

  return (
    <>
    { entryFound || mode === 'new'?
    <form className={styles.entryForm} onSubmit={handleSubmit}>
      <div className={styles.textArea}>
        <label className={styles.fieldLabel}>Title:</label>
        <input
          type='text'
          name='entryTitle'
          value={entryTitle}
          onChange={(event) => { setEntryTitle(event.target.value) }}
          required
        />
      </div>

      <div className={styles.dropdownArea}>
        <label className={styles.fieldLabel}>Artists:</label>
        <DropdownMenu
          inputType='checkbox'
          options={artistOptions}
          isOpen={true}
          name={"artistSelection"}
          optionsState={{ state: artistFilter.selected, setter: artistFilter.setSelected }}
          onSearchChange={artistFilter.setSearchText}
        ></DropdownMenu>
      </div>

      <div className={styles.selectedFilters}>
        <SelectedFilters type='artist' filters={artistFilter.selected} onRemoveFilter={(value: string) => {
          artistFilter.setSelected((prev) => prev.filter((item) => item !== value));
        }} />
      </div>

      <div className={styles.dropdownArea}>
        <label className={styles.fieldLabel}>Tags:</label>
        <DropdownMenu
          inputType='checkbox'
          options={tagOptions}
          isOpen={true}
          name={"tagSelection"}
          optionsState={{ state: tagFilter.selected, setter: tagFilter.setSelected }}
          onSearchChange={tagFilter.setSearchText}
        ></DropdownMenu>
      </div>

      <div className={styles.selectedFilters}>
        <SelectedFilters type='tag' filters={tagFilter.selected} onRemoveFilter={(value: string) => {
          tagFilter.setSelected((prev) => prev.filter((item) => item !== value));
        }} />
      </div>

      <div className={styles.dropdownArea}>
        <label className={styles.fieldLabel}>Category:</label>
        <DropdownMenu
          inputType='radio'
          options={catOptions}
          isOpen={true}
          name={"catSelection"}
          optionsState={{ state: catFilter.selected, setter: catFilter.setSelected }}
          onSearchChange={catFilter.setSearchText}
        ></DropdownMenu>
      </div>

      <div className={`${styles.selectedCat} linearShine`}>
        {catFilter.selected[0]}
      </div>

      <div className={styles.textArea} >
        <label className={styles.fieldLabel}>Description:</label>
        <textarea
          name='entryDesc'
          value={entryDesc || ''}
          onChange={(event) => { setEntryDesc(event.target.value) }}
        />
      </div>

      <button type='submit' className={`${styles.submitButton} wideLinearShine`}>Save New Entry</button>
    </form>
    : <p className={styles.entryNotFound}> Entry not found </p>
    }
    </>
  );
}