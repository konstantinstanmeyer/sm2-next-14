"use client"

export default function TableRow({ index, card, setViewCard }: any){
    return (
        <tr key={"data-row" + index} className="highlight">
            <td className="">{card.language}</td>
            <td className="">{card.original}</td>
            <td className="">{card.translation}</td>
            <td onClick={() => setViewCard(card)}>Click</td>
            {/* <td className="">{!card?.phonetic ? "None" : card?.phonetic}</td>
            <td className="">{!card?.context ? "None" : card?.context}</td>
            <td onClick={() => handleImageClick(card?.image)} className="">{card?.image ? "Click to View" : "None"}</td> */}
        </tr>
    )
}