import mongoDBConnection from "@/lib/mongodb/connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: {params: Promise<{ id: string }> }){
    await mongoDBConnection();

    return NextResponse.json({ text: "hi"}, { status: 200 });
}