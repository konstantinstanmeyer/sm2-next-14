import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/user";  // Use the updated User model
import Card from "@/models/card";

export async function POST(request: NextRequest) {
    const session = await getServerSession();

    // Sample card object to be added to the user's cards array

    const card = await request.json();

    const email = session?.user?.email;
    const filter = { email: email };

    const user = await User.findOne(filter);
    const id = user._id;

    if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newCard = new Card({ language: card.language, original: card.original, translation:card.translation, image:card?.image, context: card?.context, phonetic: card?.phonetic, user: id });

    const response = await newCard.save();

    user.cards.push(response._id);
    await user.save();

    return NextResponse.json({ message: "Card saved successfully" }, { status: 200 });
}