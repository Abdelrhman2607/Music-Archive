import importData from '@/data/importData';
import exportData from '@/data/exportData';

export async function GET(){
    const backupJSON = await exportData();

    return Response.json( backupJSON, { status: 200 });
}

export async function POST(request: Request){
    const body = await (request.json());
    await importData(body.backup);

    return Response.json( {data:'import'}, { status: 200 });
}