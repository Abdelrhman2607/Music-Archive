'use client';

import styles from './filterEntry.module.css';

import { useState } from 'react';

import { MdEdit, MdDeleteForever, MdOutlineCheckCircle, MdClose } from "react-icons/md";

import { FilterEntryData } from '@/definitions'

type FilterEntryProps = {
  filterType: 'tag' | 'cat' | 'artist';
  entryData: FilterEntryData;
  onSaveSuccess?: () => void;
}

export default function FilterEntry({ filterType, entryData, onSaveSuccess }: FilterEntryProps) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [beingDeleted, setBeingDeleted] = useState(false);

  const [name, setName] = useState(entryData.name);

  const headerClass = {
    'tag': styles.tagHeader,
    'cat': styles.catHeader,
    'artist': styles.artistHeader
  }
  const bodyClass = {
    'tag': styles.tagBody,
    'cat': styles.catBody,
    'artist': styles.artistBody
  }
  const inputClass = {
    'tag': styles.tagInput,
    'cat': styles.catInput,
    'artist': styles.artistInput
  }

  const editButton = (() => {
    if (beingEdited) {
      return (
        <button
          type='button'
          className={`${styles.entryEdit} linearShine`}
          onClick={async () => {
            const params = new URLSearchParams({
              filterType,
              id: entryData.id.toString(),
              value: name
            });

            const res = await fetch(`/api/filter?${params.toString()}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
              setBeingEdited(false);
              onSaveSuccess?.();
            }
          }}
        >
          <MdOutlineCheckCircle color='black' />
        </button>
      );
    }

    if (beingDeleted) {
      return (
        <button
          type='button'
          className={`${styles.entryEdit} linearShine`}
          onClick={() => setBeingDeleted(false)}
        >
          <MdClose color='black' />
        </button>
      );
    }

    return (
      <button
        type='button'
        className={`${styles.entryEdit} linearShine`}
        onClick={() => setBeingEdited(true)}
      >
        <MdEdit color='black' />
      </button>
    );
  })();

  const deleteButton = (() => {
    if (beingEdited) {
      return (
        <button
          type='button'
          className={`${styles.entryDelete} linearShine`}
          onClick={() => setBeingEdited(false)}
        >
          <MdClose color='black' />
        </button>
      );
    }

    if (beingDeleted) {
      return (
        <button
          type='button'
          className={`${styles.entryDelete} linearShine`}
          onClick={async () => {
            if (name.length > 0) {
              const params = new URLSearchParams({
                filterType,
                id: entryData.id.toString(),
                value: name
              });

              const res = await fetch(`/api/filter?${params.toString()}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
              });

              if (res.ok) {
                setBeingDeleted(false);
                onSaveSuccess?.();
              }
            }

          }}
        >
          <MdOutlineCheckCircle color='black' />
        </button>
      );
    }

    return (
      <button
        type='button'
        className={`${styles.entryDelete} linearShine`}
        onClick={() => setBeingDeleted(true)}
      >
        <MdDeleteForever color='black' />
      </button>
    );
  })();

  return (
    <div className={styles.filterEntry}>
      <div className={headerClass[filterType]}>
        <span className={styles.entryName}>{entryData.name}</span>
        <div className={styles.entryControls}>
          {editButton}
          {deleteButton}
        </div>
      </div>

      <div className={bodyClass[filterType]}>
        {
          beingEdited ?
            <input
              type='text'
              placeholder='Enter new name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass[filterType]}
            />
            : <></>
        }

      </div>

    </div>
  );
}
