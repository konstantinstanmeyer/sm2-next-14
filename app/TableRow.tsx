"use client"

export default function TableRow({ index, card, setViewCard }: any){
    return (
        <tr key={"data-row" + index} className="highlight">
            <td className="">{card.language}</td>
            <td className="">{card.original}</td>
            <td className="">{card.translation}</td>
            <td onClick={() => setViewCard(card)}>Click</td>
        </tr>
    )
}