
import styles from './entryFormHeader.module.css';

export default function EntryFormHeader({editEntry = false, title}: {editEntry?: boolean, title?: string}){
    return(
        editEntry?
        (<h1 className={styles.pageHeader}>Edit Entry: <span style={{ fontWeight: '600'}}>{title}</span></h1>)
        :
        (<h1 className={styles.pageHeader}>New Entry</h1>)
    );
}
        
