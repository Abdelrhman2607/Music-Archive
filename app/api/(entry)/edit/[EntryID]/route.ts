
import getEntryDataByID from '@/data/data_fetching/single/getEntryDataByID'

export async function GET(request: Request) {
    const responseURL = new URL(request.url);
    const path = responseURL.pathname.split('/');
    const entryId = path[path.length - 1] || 0;

    const data = await getEntryDataByID(entryId)
    console.log(data);

    return Response.json(data, {status: 200});
}


export async function PUT(request: Request) {

    const data = await request.json();
    // console.log(data);

    return Response.json(data, {status: 200});
}