import getCats from '@/data/data_fetching/multiple/getCats';

export async function GET(request: Request) {

    const searchText = new URL(request.url).searchParams.get('target') || '';
    const cats = await getCats(searchText);

    return Response.json(cats, { status: 200 });
}