import SignIn from "./SignIn"; // Importing the SignIn component
import SignOut from "./SignOut"; // Importing the SignOut component

// Server Component for Navbar

// async function getData() {
//     const res = await fetch('/api/random-message');
//     const data: any = await res.json();
//     return data.randomMessage;
// }

export default async function Navbar({ session }: any) {
    // Simulate server-side fetching of random message
    // const randomMessage = await getData();

    // Return the Navbar with the session and random message props
    return (
        <div className="bg-[#faefe4] z-10 thick-shadow w-full fixed top-0 h-6 border-black border-b-[1.5px] flex flex-row">
            {session?.user?.name ? (
                <>
                    <a href="/" className="ml-2 pixelify border-r-[1.5px] border-black pr-2">Hello, {session.user.name?.split(" ")[0]}</a>
                    <div className="ml-auto pixelify flex flex-row items-center justify-center">
                        <a href="/study" className="px-2 border-l-[1.5px] border-black">Study</a>
                        <SignOut />
                    </div>
                </>
            ) : (
                <SignIn randomMessage={"Hello"} />
            )}
        </div>
    );
}