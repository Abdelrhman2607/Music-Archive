'use client'

import styles from './newFilterInput.module.css'

import { useState } from "react";

type FilterEntryProps = {
  filterType: 'tag' | 'cat' | 'artist';
  parentCat?: string
  onSaveSuccess?: () => void;
}

export default function NewFilterInput({ filterType, onSaveSuccess, parentCat }: FilterEntryProps) {
  const filterFullNames = {
    'tag': 'Tag',
    'cat': 'Category',
    'artist': 'Artist',
  }

  const [name, setName] = useState('');

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.inputText}
        type="text"
        placeholder={`New ${filterFullNames[filterType]}`}
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <button
        className={`${styles.createButton} linearShine`}
        onClick={async () => {
          if (name.length > 0) {
            const params = new URLSearchParams({
              filterType,
              value: name,
              parentCat: parentCat ?? ''
            });

            const res = await fetch(`/api/filter?${params.toString()}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
              setName('');
              onSaveSuccess?.();
            }
          }

        }}
      >
        Create new {filterFullNames[filterType]}
      </button>
    </div>
  );
}