
import EntryForm from '@/app/components/MusicEntries/EntryForm/entryForm';
import EntryFormHeader from '@/app/components/MusicEntries/EntryFormHeader/entryFormHeader';

import getEntryTitleByID from '@/data/data_fetching/single/getEntryTitleByID';

type Props = {
  params: Promise<{ EntryID: number }>;
};

export default async function editEntryPage({params}: Props){
    const id = (await params).EntryID;
    const title = await getEntryTitleByID(id);

    return(
    <main>
        <EntryFormHeader editEntry={true} title={title}/>
        <EntryForm mode='edit' entryId={id}/>
    </main>
    );
}