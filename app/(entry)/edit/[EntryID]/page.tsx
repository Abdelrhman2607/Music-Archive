
import EntryForm from '@/app/components/EntryForm/entryForm';
import EntryFormHeader from '@/app/components/EntryFormHeader/entryFormHeader';

import getEntryDataByID from '@/data_fetching/getEntryDataByID';

type Props = {
  params: Promise<{ EntryID: string }>;
};

export default async function editEntryPage({params}: Props){
    const id = (await params).EntryID;
    const title = await getEntryDataByID(id);

    console.log(title);
    return(
    <main>
        <EntryFormHeader editEntry={true} title='{title}'/>
        <EntryForm />
    </main>
    );
}