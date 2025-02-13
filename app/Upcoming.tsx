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
                <p>Some of the incoming changes/updates that will be included with future updates include:</p>
                <p>- Library of real-world sentences and text, utilizing Mozilla's common language database</p>
                <p>- Filtering by language</p>
                <p>- Quiz Support</p>
                <p>- Further context support (optional fields for specific linguistic use-cases)</p>
                <p>- Ability to browse other users' cards for a given language</p>
                <p>- Support for users without accounts to browse certain features (T.B.D.)</p>
            </div>
        </div>
    )
}