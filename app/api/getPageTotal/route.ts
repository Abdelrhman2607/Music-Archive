import getPageTotal from '@/data/data_fetching/getPageTotal';

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table') || 'music_entries';
    
    const pageTotal = await getPageTotal(table);
    return Response.json(pageTotal, {status: 200})
}