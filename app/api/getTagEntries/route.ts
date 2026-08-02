import getFilterEntries from "@/data_fetching/multiple/getFilterEntries";

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page') ?? 0);
    const target = searchParams.get('target') ?? '';
    const filterType = searchParams.get('filterType') ?? 'tag'

    const data = await getFilterEntries(
            filterType,
            Number.isInteger(page) && page >= 0 ? page : 0,
            target
         );
    
    return Response.json(data, { status: 200 });
}