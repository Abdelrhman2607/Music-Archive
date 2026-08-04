
import EntryFormHeader from '@/app/components/MusicEntries/EntryFormHeader/entryFormHeader';
import EntryForm from '@/app/components/MusicEntries/EntryForm/entryForm';

export default function newEntryPage(){
    return(
    <main>
        <EntryFormHeader />
        <EntryForm mode='new'/>
    </main>
    );
}