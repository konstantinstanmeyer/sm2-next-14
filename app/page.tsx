"use client"

import { useState } from "react";
import Language from "./Language";
import Landing from "./Landing";
import Study from "./Study";
import AddCard from "./AddCard";

export default function Home() {
  const [viewingMode, setViewingMode] = useState<string>("Landing");

  return (
    <div className="w-screen flex justify-center items-center relative h-[90vh]">
      <div className="flex flex-col absolute top-2 left-2">
            <button onClick={() => setViewingMode("Info")} className="flex flex-col gap-1 text-white text-sm items-center p-2 bg-transparent !shadow-none cursor-pointer">
              <img className="w-12" src="bulb.png"/>
              Info
            </button>
            <button onClick={() => setViewingMode("Study")} className="flex flex-col gap-1 text-white text-sm items-center p-2 bg-transparent !shadow-none cursor-pointer">
              <img className="w-12" src="book.png"/>
              Study
            </button>
            <button onClick={() => setViewingMode("Add")} className="flex flex-col gap-1 text-white text-sm items-center p-2 bg-transparent !shadow-none cursor-pointer">
              <img className="w-12" src="pencils.png"/>
              Add
            </button>
          </div>
      {viewingMode === "Landing" ? 
        (<Landing />) :
        viewingMode === "Language" ?
        (<Language />) :
        viewingMode === "Study" ? 
        (<Study setViewingMode={setViewingMode} />) :
        viewingMode === "Add" ? 
        <AddCard language="Indonesian" text="" setViewingMode={setViewingMode} /> :
        null
      }
      {/* <Language /> */}
    </div>
  );
}
