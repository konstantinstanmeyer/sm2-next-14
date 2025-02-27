"use client"

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Language from "./Language";
import Landing from "./Landing";
import Library from "./Library";
import AddCard from "./AddCard";
import Error from "./Error";
import Info from "./Info";
import Upcoming from "./Upcoming";
import Quiz from "./Quiz";

export default function Home() {
  const [viewingMode, setViewingMode] = useState<string>("Landing");
  const [language, setLanguage] = useState<string | undefined>(undefined);
  const [text, setText] = useState<string>("");
  const { data: session, status } = useSession();

  return (
    <div className="w-screen flex justify-center items-center relative h-[90vh]">
      <div id="icons-container" className="flex absolute top-2 left-2">
        <button onClick={() => setViewingMode("Info")} className="flex flex-col gap-1 text-white text-sm items-center p-2 bg-transparent !shadow-none cursor-pointer">
          <img className="w-12" src="bulb.png"/>
          Info
        </button>
        <button onClick={() => setViewingMode("Library")} className="flex flex-col gap-1 text-white text-sm items-center p-2 bg-transparent !shadow-none cursor-pointer">
          <img className="w-12" src="book.png"/>
          Library
        </button>
        <button onClick={() => setViewingMode("Add")} className="flex flex-col gap-1 text-white text-sm items-center p-2 bg-transparent !shadow-none cursor-pointer">
          <img className="w-12" src="pencils.png"/>
          Add
        </button>
        <button onClick={() => setViewingMode("Quiz")} className="flex flex-col gap-1 text-white text-sm items-center p-2 bg-transparent !shadow-none cursor-pointer">
          <img className="w-12" src="brain.png"/>
          Quiz
        </button>
        <button onClick={() => setViewingMode("Settings")} className="flex flex-col gap-1 text-white text-sm items-center p-2 bg-transparent !shadow-none cursor-pointer">
          <img className="w-12" src="settings.png"/>
            Settings
        </button>
        <button onClick={() => setViewingMode("Upcoming")} className="flex flex-col gap-1 text-white text-sm items-center p-2 bg-transparent !shadow-none cursor-pointer">
          <img className="w-12" src="cardboard.png"/>
            Upcoming
        </button>
      </div>
      {viewingMode === "Info" ? 
        <Info setViewingMode={setViewingMode}/> :
        viewingMode === "Upcoming" ? 
        <Upcoming setViewingMode={setViewingMode}/> :
        viewingMode === "Landing" && status === "unauthenticated" ? 
        <Landing setViewingMode={setViewingMode} /> :
        viewingMode === "Language" && status === "authenticated" ?
        <Language /> :
        viewingMode === "Library" && status === "authenticated" ? 
        <Library setAddLanguage={setLanguage} setAddText={setText} sessionStatus={status} setViewingMode={setViewingMode} /> :
        viewingMode === "Add" && status === "authenticated" ? 
        <AddCard setAddLanguage={setLanguage} setText={setText} sessionStatus={status} language={language} text={text} setViewingMode={setViewingMode} /> :
        viewingMode === "Quiz" && status === "authenticated" ? 
        <Quiz setViewingMode={setViewingMode} /> :
        viewingMode !== "" && status === "unauthenticated" ? 
        <Error setViewingMode={setViewingMode} /> : null
      }
      {/* <Language /> */}
    </div>
  );
}
