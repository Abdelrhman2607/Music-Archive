import getGridEntries from "@/data_fetching/multiple/getGridEntries";

export async function GET(request: Request) {

    const page = Number(new URL(request.url).searchParams.get('page') ?? 0);
    const data = await getGridEntries(Number.isInteger(page) && page >= 0 ? page : 0);

    return Response.json(data, { status: 200 });
}