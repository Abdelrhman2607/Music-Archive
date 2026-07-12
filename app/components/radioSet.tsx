'use client';

import styles from './radioSet.module.css';

export default function RadioSet({ optionsText }: { optionsText: string[] }) {
  return (
    <div>
      {optionsText.map((option, index) => {
        return(<RadioOption optionText={option} key={index} isDefault={index===0} />);
        }
      )}
    </div>
  );
}

function RadioOption({ optionText, isDefault }: { optionText: string, isDefault: boolean }) {
  return (
    <>
      <label className={styles.radioOption}>
        <input 
          type='radio' name='searchType' value={optionText} defaultChecked={isDefault}
          className={styles.primitiveRadio}
          onChange={(event)=>console.log(event.currentTarget.value)}
        />
        <span className={styles.customRadio}></span>
        <span className={styles.radioLabel}>{optionText}</span>
      </label>
    </>
  );
}
