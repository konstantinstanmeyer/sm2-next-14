import SignIn from "./SignIn"; // Importing the SignIn component

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
                <p className="ml-2 pixelify border-r-[1.5px] border-black pr-2">Hello, {session.user.name?.split(" ")[0]}</p>
            ) : (
                <SignIn randomMessage={"Hello"} />
            )}
        </div>
    );
}