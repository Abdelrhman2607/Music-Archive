import getCatPath from '@/data/data_fetching/single/getCatPath';

export async function GET(request: Request){
    const id = Number(new URL(request.url).searchParams.get('id'));
    const path = await getCatPath(id);
    return Response.json(path, {status: 200})
}