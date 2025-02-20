import mongoDBConnection from "@/lib/mongodb/connection";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { CollectionModel, CardModel } from "@/models/types/models";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest){
    const { language, collectionName, sandbox } = await request.json();

    console.log(language, collectionName, sandbox)
    const session = await getServerSession();
    const email = session?.user?.email;

    await mongoDBConnection();

    const filter = { email: email };

    // change to let user."...".populate() be dependent on if there is a language or collectionName present
    const user: any = await User.findOne(filter)
    .populate("cards")
    .populate("collections.cards")
    .lean();

    let cards: any = [];

    if(collectionName){
        const collection = user.collections.find((col: CollectionModel) => col.name === collectionName);
        if (!collection) {
            return NextResponse.json({ error: "Collection not found" }, { status: 404 });
        }
        cards = collection.cards;
    } else if (language){
        cards = user.cards.filter((card: CardModel) => card.language === language);
    }

    if (!cards.length) {
        return NextResponse.json({ message: "No cards available" }, { status: 200 });
    }

    const now = new Date();

    if(sandbox){
        // Fisher-Yates algorithm
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        return NextResponse.json({ cards: cards }, { status: 200 });
    } else {
        const sortedCards = cards
        .filter((card: any) => {
            const nextReviewDate = new Date(card.updatedAt);
            nextReviewDate.setDate(nextReviewDate.getDate() + card.superMemo.interval);
            return nextReviewDate <= now; // include only due cards
        })
        .sort((a: any, b: any) => {
            if (a.superMemo.interval !== b.superMemo.interval) {
                return a.superMemo.interval - b.superMemo.interval; // shorter interval first
            }
            if (a.superMemo.EF !== b.superMemo.EF) {
                return a.superMemo.EF - b.superMemo.EF; // lower EF (harder cards) first
            }
            return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(); // older last review first
        });

        return NextResponse.json({ cards: sortedCards}, { status: 200})
    }

}