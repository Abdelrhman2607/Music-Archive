
import styles from './pageNav.module.css';

import { useState } from 'react';

type PageNavProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
export default function PageNav({currentPage, setCurrentPage}:PageNavProps){
    return(
        <nav className={styles.pageNav}>

            <button 
            className={styles.arrowNavButtonDown}
            onClick={()=>{setCurrentPage(Math.max(0, currentPage - 1))}}>
                &#60;
            </button>

            <input 
            type='text'
            inputMode='numeric'
            className={styles.pageNumber} 
            value={currentPage}
            onChange={(e)=>setCurrentPage(parseInt(e.currentTarget.value) || 0)}
            />

            <button 
            className={styles.arrowNavButtonUp}
            onClick={()=>{setCurrentPage(currentPage + 1)}}>
                &#62;
            </button>

        </nav>
    )
}