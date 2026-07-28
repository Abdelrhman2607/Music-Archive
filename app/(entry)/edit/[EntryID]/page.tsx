'use client';

import { useParams } from 'next/navigation';
import styles from './page.module.css';
import EntryForm from '@/app/components/EntryForm/entryForm';

export default function newEntryPage(){
    const params = useParams<{EntryID: string}>();
    console.log(params.EntryID)
    return(
    <main>
        <h1 className={styles.pageHeader}>Edit Entry: <span style={{ fontWeight: '600'}}>{params.EntryID}</span></h1>
        <EntryForm />
    </main>
    );
}