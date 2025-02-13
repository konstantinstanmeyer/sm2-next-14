import { Dispatch, SetStateAction } from "react";

export default function Upcoming({ setViewingMode }: { setViewingMode: Dispatch<SetStateAction<string>>}) {
    return (
        <div className="window w-80 z-10">
            <div className="title-bar">
            <div className="select-none title-bar-text">Upcoming</div>
            <div className="title-bar-controls">
                <button onClick={() => setViewingMode("")} aria-label="Close"></button>
            </div>
            </div>
            <div className="window-body">
                <p>This is stuff that will be coming soon</p>
            </div>
        </div>
    )
}