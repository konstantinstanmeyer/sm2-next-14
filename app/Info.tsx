import { Dispatch, SetStateAction } from "react";

export default function Info({ setViewingMode }: { setViewingMode: Dispatch<SetStateAction<string>>}) {
    return (
        <div className="window w-80 z-10">
            <div className="title-bar">
            <div className="select-none title-bar-text">Info</div>
            <div className="title-bar-controls">
                <button onClick={() => setViewingMode("")} aria-label="Close"></button>
            </div>
            </div>
            <div className="window-body h-[21rem]">
                <p>
                    Flashcards are a great starting point for language learning—but they're not the whole picture. Inspired by Anki and its modified SM-2 algorithm, this platform takes the core principles of spaced repetition and reshapes them to serve languages that don't fit neatly into rigid memorization systems. Some may say Anki already does the job. We see room for something more.
                </p>
                <p>&nbsp;</p>
                <p>
                    Instead of relying on rote memorization alone, this system provides the missing context: pronunciation shifts, honorific usage, grammatical nuances that only emerge in real-world conversation. The goal isn't to make an app that does the heavy lifting for you, but to create a reference library you can trust—one that ensures you have all the necessary details to truly understand what you're learning.
                </p>
                <p>&nbsp;</p>
                <p>
                    Language isn't just about storing words in your brain; it's about knowing how to use them, when to use them, and why they matter. That's where this tool comes in.
                </p>
            <p>&nbsp;</p>
            <p>- Konstantin</p>
            </div>
        </div>
    )
}