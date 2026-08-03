import getTags from '@/data/data_fetching/multiple/getTags';

export async function GET(request: Request) {

    const searchText = new URL(request.url).searchParams.get('target') || '';
    const tags = await getTags(searchText);

    return Response.json(tags, { status: 200 });
}