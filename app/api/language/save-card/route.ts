import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import Card from "@/models/card";

export async function POST(request: NextRequest){
    const { content } = await request.json()

    const card = new Card({ text: content })
    
    const response = await card.save();

    return NextResponse.json({ response }, { status: 200 });
}