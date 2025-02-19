import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/user";  // Use the updated User model
import Card from "@/models/card";
import mongoDBConnection from "@/lib/mongodb/connection";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

export async function POST(request: NextRequest) {
    const session = await getServerSession();

    await mongoDBConnection();

    const card = await request.json();

    const email = session?.user?.email;
    const filter = { email: email };

    const user = await User.findOne(filter);
    const id = user._id;

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const newCard = new Card({ language: card.language, original: card.original, translation:card.translation, image:card?.image, context: card?.context, phonetic: card?.phonetic, user: id });

    const collectionName = card?.collection;

    const response = await newCard.save();
    console.log(response)

    if(card?.collection){
        console.log("hello1")
        user.cards.push(response._id);
        const foundCollection = user.collections.find((collection: any) => collection.name === collectionName);
        console.log("hello2")
        if (foundCollection){
            foundCollection.cards.push(response._id);
            console.log("hello4")
            await user.save();
        } else {
            user.collections.push({
                name: collectionName,
                cards: [response._id]
            })
            await user.save();
        }
    }

    return NextResponse.json({ message: "Card saved successfully" }, { status: 200 });
}