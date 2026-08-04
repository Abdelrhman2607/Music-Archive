'use client';

import styles from './searchArea.module.css';

import Searchbar from '@/app/components/Search/searchbar';
import DropdownMenu from '@/app/components/UI/dropdownMenu/dropdownMenu';
import SelectedFilters from '@/app/components/UI/selectedFilters/selectedFilters';

import { useState, useEffect } from 'react';
import { useFilterDropdownType } from '@/util/useFilterDropdown'

export default function SearchArea({ setSearchBarValue, tagFilter, catFilter, artistFilter}: 
  {
    setSearchBarValue: React.Dispatch<React.SetStateAction<string>>,
    tagFilter: useFilterDropdownType,
    catFilter: useFilterDropdownType,
    artistFilter: useFilterDropdownType,
  }) {

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
      .then((data) => setCatOptions(data));
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


  return (
    <div className={styles.searchArea}>
      <div className={styles.searchAreaControls}>
        <Searchbar 
          setSearchBarValue={setSearchBarValue}
        />

        <div className={styles.filterArea}>
          <button className={`${styles.filterButton} linearShine`} onClick={() => { tagFilter.toggleOpen(); }}>
            Filter by Tag
          </button>
          <DropdownMenu
            inputType='checkbox'
            options={tagOptions}
            isOpen={tagFilter.isOpen}
            name={"tagFilter"}
            optionsState={{ state: tagFilter.selected, setter: tagFilter.setSelected}}
            onSearchChange={tagFilter.setSearchText}
          />
        </div>

        <div className={styles.filterArea}>
          <button className={`${styles.filterButton} linearShine`} onClick={() => { catFilter.toggleOpen(); }}>
            Filter by Category
          </button>
          <DropdownMenu
            inputType='checkbox'
            options={catOptions}
            isOpen={catFilter.isOpen}
            name={"catFilter"}
            optionsState={{ state: catFilter.selected, setter: catFilter.setSelected}}
            onSearchChange={catFilter.setSearchText}
          />
        </div>

        <div className={styles.filterArea}>
          <button className={`${styles.filterButton} linearShine`} onClick={() => { artistFilter.toggleOpen(); }}>
            Filter by Artist
          </button>
          <DropdownMenu
            inputType='checkbox'
            options={artistOptions}
            isOpen={artistFilter.isOpen}
            name={"artistFilter"}
            optionsState={{ state: artistFilter.selected, setter: artistFilter.setSelected}}
            onSearchChange={artistFilter.setSearchText}
          />
        </div>

      </div >

      <SelectedFilters
        type='tag'
        filters={tagFilter.selected}
        onRemoveFilter={(value: string) => {
          tagFilter.toggleSelection(value);
        }}
      />
      <SelectedFilters
        type='cat'
        filters={catFilter.selected}
        onRemoveFilter={(value: string) => {
          catFilter.toggleSelection(value);
        }}
      />
      <SelectedFilters
        type='artist'
        filters={artistFilter.selected}
        onRemoveFilter={(value: string) => {
          artistFilter.toggleSelection(value);
        }}
      />

    </div>
  );
}