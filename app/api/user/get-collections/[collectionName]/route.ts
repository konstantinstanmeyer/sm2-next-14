import mongoDBConnection from "@/lib/mongodb/connection";
import { CollectionModel, UserModel } from "@/models/types/models";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { collectionName: string } }){
    const { collectionName } = params;

    const session = await getServerSession();

    await mongoDBConnection();

    const email = session?.user?.email;
    const filter = { email: email };

    const user: any = await User.findOne(filter).populate("collections.cards").lean();

    if (user){
        const collection = user.collections.find((col: CollectionModel) => col.name === collectionName);
        return NextResponse.json({ cards: collection.cards }, { status: 200 });
    } else {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
}