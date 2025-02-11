import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/user";  // Use the updated User model
import Card from "@/models/card";
import mongoDBConnection from "@/lib/mongodb/connection";

export async function GET(request: NextRequest) {
    const session = await getServerSession();

    const email: string | undefined | null = session?.user?.email;

    if (email) {
        await mongoDBConnection();

        const user: any = await User.findOne({ email: email });

        const cards = await Card.find({ user: user._id });

        return NextResponse.json({ cards: cards }, { status: 200 });
    }

    return NextResponse.json({message: "not logged in"}, { status: 404 })

    // Sample card object to be added to the user's cards array
}