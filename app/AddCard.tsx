
interface Props {
    language: string;
    text: string;
}

export default function AddCard({ language, text }: Props){
    

    return (
        <div className="">
            <form>
                <textarea className="h-fit w-30 bg-[#ffe8ce] border-[1px] border-black resize-none px-4 py-3" value={text} />
            </form>
        </div>
    )
}