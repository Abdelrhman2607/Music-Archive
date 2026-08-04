import deleteEntry from '@/data/data_mutation/deleteEntry';

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id') ?? 0;

    await deleteEntry(id);

    return Response.json({ status: 200 });
}