import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const loginMessages = [
        "Click 'log in'—and we'll be inseparable!",
        "Let’s make it official—log in and I’ll remember you!",
        "Log in to save your footsteps in my world!",
        "Don’t let your path fade—log in to save it!",
        "Want me to save your digital breadcrumbs? Just log in!"
    ];

    const randomIndex = Math.floor(Math.random() * loginMessages.length);
    const randomMessage = loginMessages[randomIndex];

    console.log(randomMessage);

    return NextResponse.json({ randomMessage },  { status: 200 });
}