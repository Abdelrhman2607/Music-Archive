
import styles from './pageNav.module.css';

type PageNavProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageTotal: number;
};
export default function PageNav({ currentPage, setCurrentPage, pageTotal }: PageNavProps) {
  return (
    <nav className={styles.pageNav}>

      <div className={styles.boxShadowContainer}>
        <button
          className={`${styles.arrowNavButtonDown} linearShine`}
          disabled={currentPage === 1}
          onClick={() => { 
            setCurrentPage(Math.max(1, currentPage - 1));
            }}>
          &#60;
        </button>

        <input
          type='text'
          inputMode='numeric'
          className={styles.pageNumber}
          value={currentPage}
          onChange={(e) => {
            let input = parseInt(e.currentTarget.value);
            if (input > pageTotal){
              input = pageTotal;
            }
            setCurrentPage( input || 1)
            }
          }
        />

        <button
          className={`${styles.arrowNavButtonUp} linearShine`}
          disabled={currentPage >= pageTotal}
          onClick={() => { 
            setCurrentPage(currentPage + 1);
             }}>
          &#62;
        </button>
      </div>
    </nav>
  )
}