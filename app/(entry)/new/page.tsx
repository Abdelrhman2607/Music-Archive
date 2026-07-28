
import styles from './page.module.css';
import EntryForm from '@/app/components/EntryForm/entryForm';

export default function newEntryPage(){
    return(
    <main>
        <h1 className={styles.pageHeader}>New Entry</h1>
        <EntryForm />
    </main>
    );
}