
import styles from './page.module.css';
import EntryForm from '@/app/components/EntryForm/entryForm';
import EntryFormHeader from '@/app/components/EntryFormHeader/entryFormHeader';

import { getTitleByID } from '@/utils/db_pool';

type Props = {
  params: Promise<{ EntryID: string }>;
};

export default async function editEntryPage({params}: Props){
    const id = (await params).EntryID;
    const title = await getTitleByID(id);

    return(
    <main>
        <EntryFormHeader editEntry={true} title={title}/>
        <EntryForm />
    </main>
    );
}