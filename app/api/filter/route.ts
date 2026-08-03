import updateFilter from '@/data/data_mutation/updateFilter';
import deleteFilter from '@/data/data_mutation/deleteFilter';
import createFilter from '@/data/data_mutation/createFilter';

import getCatIDByCatName from '@/data/data_fetching/single/getCatIDByCatName';

const filterFullNames: Record<string, string> = {
    filter: 'Filter',
    tag: 'Tag',
    cat: 'Category',
    artist: 'Artist'
}

export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);

    const value = searchParams.get('value') ?? 'Unnamed tag';
    const id = searchParams.get('id') ?? 0;
    const filterType = searchParams.get('filterType') || filterFullNames['filter'];

    const errorCode = await updateFilter(
        filterType,
        id,
        value
    );

    if (errorCode === '23505') {
        
        const errorMsg = `${filterFullNames[filterType]} with this name already exists`
        return Response.json({ error: errorMsg }, { status: 400 });
    }
    else {
        return Response.json({ status: 200 });
    }
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);

    const value = searchParams.get('value') || 'Unnamed tag';
    const filterType = searchParams.get('filterType') || filterFullNames['filter'];
    const catParent = searchParams.get('parentCat') || null;

    let parentId;
    if (filterType === 'cat' && catParent){
        parentId = await getCatIDByCatName(catParent);
    }

    const errorCode = await createFilter(
        filterType,
        value,
        parentId
    );

    if (errorCode === '23505') {
        const errorMsg = `${filterFullNames[filterType]} with this name already exists`
        return Response.json({ error: errorMsg }, { status: 400 });
    }
    else {
        return Response.json({ status: 200 });
    }
    ;
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id') ?? 0;
    const filterType = searchParams.get('filterType') || filterFullNames['filter'];

    const errorCode = await deleteFilter(
        filterType,
        id
    );

    if (errorCode === '23503' && filterType === 'cat') {
        const errorMsg = 'Can\'t delete a category with existing subcategories'
        return Response.json({ error: errorMsg }, { status: 400 });
    }

    else {
        return Response.json({ status: 200 });
    }
}