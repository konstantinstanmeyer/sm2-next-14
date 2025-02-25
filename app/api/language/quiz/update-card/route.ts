import User from "@/models/user";
import Card from "@/models/card";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import sm2 from "@/util/sm2";
import { CardModel } from "@/models/types/models";

interface CardInfo {
    cardId: CardModel;
    score: number;
}

export async function POST(request: NextRequest){
    const { cardId, score }: CardInfo = await request.json();

    const session = await getServerSession();

    const email = session?.user?.email;

    const user = await User.findOne({ email: email });

    if (user){
        let card = await Card.findOne({ _id: cardId });
        console.log(card);
        card = sm2(card, score);
        await card.save();
        return NextResponse.json({ message: "success"}, {status: 200});
    }
}