import SignIn from "./SignIn";

export default function Navbar(){
    const loginMessage = [
        "Click 'log in'—and we'll be inseparable!", 
        "Let’s make it official—log in and I’ll remember you!", 
        "Log in to save your footsteps in my world!", 
        "Don’t let your path fade—log in to save it!",
        "Want me to save your digital breadcrumbs? Just log in!"
    ]
    const randomIndex = Math.floor(Math.random() * 5);

    return (
        <div className="bg-[#ffdeb9] w-full fixed top-0 h-6 border-black border-b-[1.5px] flex flex-row">
        <SignIn />
    </div>
    )
}