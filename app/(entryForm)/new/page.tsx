
import EntryFormHeader from '@/app/components/EntryFormHeader/entryFormHeader';
import EntryForm from '@/app/components/EntryForm/entryForm';

export default function newEntryPage(){
    return(
    <main>
        <EntryFormHeader />
        <EntryForm mode='new'/>
    </main>
    );
}