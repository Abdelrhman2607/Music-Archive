import updateFilter from '@/data/data_mutation/updateFilter';
import deleteFilter from '@/data/data_mutation/deleteFilter';
import createFilter from '@/data/data_mutation/createFilter';

export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);

    const value = searchParams.get('value') ?? 'Unnamed tag';
    const id = searchParams.get('id') ?? 0;
    const filterType = searchParams.get('filterType');

    const data = await updateFilter(
        filterType,
        id,
        value
    );

    return Response.json({ status: 200 });
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);

    const value = searchParams.get('value') ?? 'Unnamed tag';
    const filterType = searchParams.get('filterType');

    const data = await createFilter(
        filterType,
        value
    );

    return Response.json({ status: 200 });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id') ?? 0;
    const filterType = searchParams.get('filterType');

    const errorCode = await deleteFilter(
        filterType,
        id
    );

    if (errorCode === '23503' && filterType === 'cat'){
        const errorMsg = 'Can\'t delete a category with existing subcategories'
        return Response.json({error: errorMsg}, { status: 400 });
    }
    else{
        return Response.json({ status: 200 });
    }
}