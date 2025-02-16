import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { information: string } }) {
    const { information } = params;

    // console.log(information)

    const [ language, sampleLength ] = information.split("-");
    const sampleNumber = Number(sampleLength);

    // Construct the URL for the static file
    const fileUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/languages/${language}/basic.txt`;

    try {
        // Fetch the file from the public directory as a static asset
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error(`Failed to fetch file: ${response.statusText}`);

        const text = await response.text();
        const textBlocks = text.split("\n").map(line => line.trim()).filter(line => line.length > 0);

        // Ensure we get at most 20 unique random entries
        const sampleSize = Math.min(sampleNumber, textBlocks.length);
        const selectedSamples: string[] = [];

        while (selectedSamples.length < sampleSize) {
            const index = Math.floor(Math.random() * textBlocks.length);
            const sample = textBlocks[index];
            if (!selectedSamples.includes(sample)) {
                selectedSamples.push(sample);
            }
        }

        // console.log("Selected texts:", selectedSamples);

        return NextResponse.json({ samples: selectedSamples }, { status: 200 });
    } catch (error) {
        console.error("Error reading file:", error);
        return NextResponse.json({ error: "File not found or could not be read" }, { status: 500 });
    }
};