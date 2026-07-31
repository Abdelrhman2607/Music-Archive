
export async function PUT(request: Request) {

    const data = await request.json();
    // console.log(data);

    return Response.json(data, {status: 200});
}