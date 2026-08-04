import createEntry from '@/data/data_mutation/createEntry';

export async function POST(request: Request) {

    const data = await request.json();
    await createEntry(data);

    return Response.json(data, {status: 200});
}

