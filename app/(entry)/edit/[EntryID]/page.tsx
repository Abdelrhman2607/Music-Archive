
import EntryForm from '@/app/components/EntryForm/entryForm';
import EntryFormHeader from '@/app/components/EntryFormHeader/entryFormHeader';

import getEntryTitleByID from '@/data_fetching/getEntryTitleByID';

type Props = {
  params: Promise<{ EntryID: number }>;
};

export default async function editEntryPage({params}: Props){
    const id = (await params).EntryID;
    const title = await getEntryTitleByID(id);

    console.log(title);
    return(
    <main>
        <EntryFormHeader editEntry={true} title={title}/>
        <EntryForm mode='edit' entryId={id}/>
    </main>
    );
}