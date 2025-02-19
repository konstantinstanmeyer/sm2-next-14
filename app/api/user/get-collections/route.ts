import mongoDBConnection from "@/lib/mongodb/connection";
import { CollectionModel, UserModel } from "@/models/types/models";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const session = await getServerSession();

    await mongoDBConnection();

    const email = session?.user?.email;
    const filter = { email: email };

    const user: UserModel | null = await User.findOne(filter);

    if (user){
        const collections = user.collections.map((collection: CollectionModel) => {
            return collection.name;
        });
        return NextResponse.json({ collections: collections }, { status: 200 });
    } else {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
}