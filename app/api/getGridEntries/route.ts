import getGridEntries from "@/data_fetching/multiple/getGridEntries";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page') ?? 0);
    const target = searchParams.get('target') ?? '';

    const tags = searchParams.get("tags")?.split(",").filter(Boolean) ?? [];
    const cats = searchParams.get("cats")?.split(",").filter(Boolean) ?? [];
    const artists = searchParams.get("artists")?.split(",").filter(Boolean) ?? [];

    const data = await getGridEntries(
        Number.isInteger(page) && page >= 0 ? page : 0,
        target,
        tags,
        cats,
        artists
     );

    return Response.json(data, { status: 200 });
}