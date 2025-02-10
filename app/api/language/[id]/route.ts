import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Params {
    id: string;
}

export async function GET(request: NextRequest, { params }: {params: Promise<{ id: string }> }){
    const { id } = await params;

    console.log("hello")
    console.log(id);

    const publicDirectory = path.join(process.cwd(), 'public');
    const libraryDirectory = path.join(publicDirectory, `languages/${id}/basic.txt`);

    const text = await fs.readFile(libraryDirectory, 'utf-8');

    const textBlocks = text.split('\n');
    
    let index = Math.floor(Math.random() * textBlocks.length - 1);
    
    const result: string = textBlocks[index];

    console.log(result)

    return NextResponse.json({ text: result}, { status: 200 });
}