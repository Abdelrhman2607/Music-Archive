import getArtists from '@/data_fetching/multiple/getArtists';

export async function GET(request: Request) {

    const searchText = new URL(request.url).searchParams.get('target') || '';
    const cats = await getArtists(searchText);

    return Response.json(cats, { status: 200 });
}