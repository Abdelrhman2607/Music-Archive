'use client';

import styles from './filterEntry.module.css';

import { useState } from 'react';

import { MdEdit, MdDeleteForever, MdOutlineCheckCircle, MdClose } from "react-icons/md";

import { FilterEntryData } from '@/definitions'

export default function FilterEntry({ filterType, entryData }: { filterType: 'tag' | 'cat' | 'artist', entryData: FilterEntryData }) {
  const [beingEdited, setBeingEdited] = useState(false);

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


  return (
    <div className={styles.filterEntry}>
      <div className={headerClass[filterType]}>
        <span className={styles.entryName}>{entryData.name}</span>
        <div className={styles.entryControls}>


          <button
            className={`${styles.entryEdit} linearShine`}
            onClick={() => { 
              if (!beingEdited){
                setBeingEdited(!beingEdited) 
              }
              else{
                //save
              }
              
            }}
          >
            {beingEdited ?
              <MdEdit color='black' /> :
              <MdOutlineCheckCircle color='black' />}
          </button>

          <button 
            className={`${styles.entryDelete} linearShine`} 
            onClick={() => {
              if (beingEdited){
                setBeingEdited(!beingEdited)
              }
              else{
                // delete
              }
            }}
          >
            {beingEdited ?
              <MdClose color='black' /> :
              <MdDeleteForever color='black' />}</button>
        </div>
      </div>

      <div className={bodyClass[filterType]}>
        {
          beingEdited ?
            <input
              type='text'
              placeholder='Enter new name'
              defaultValue={entryData.name}
              className={inputClass[filterType]}
            />
            : <></>
        }

      </div>

    </div>
  );
}
