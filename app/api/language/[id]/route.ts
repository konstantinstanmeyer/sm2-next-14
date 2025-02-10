import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: string;
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    console.log("Fetching language file for:", id);

    // Construct the URL for the static file
    const fileUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/languages/${id}/basic.txt`;

    try {
        // Fetch the file from the public directory as a static asset
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error(`Failed to fetch file: ${response.statusText}`);

        const text = await response.text();
        const textBlocks = text.split("\n");

        // Ensure we don't get an out-of-bounds error
        let index = Math.floor(Math.random() * textBlocks.length);
        const result = textBlocks[index]?.trim() || "";

        console.log("Selected text:", result);

        return NextResponse.json({ text: result }, { status: 200 });
    } catch (error) {
        console.error("Error reading file:", error);
        return NextResponse.json({ error: "File not found or could not be read" }, { status: 500 });
    }
};