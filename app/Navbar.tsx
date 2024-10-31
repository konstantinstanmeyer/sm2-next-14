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
        <a className="flex flex-row items-center border-black border-r-[1.5px] pr-2" href="/">
            <img className="ml-2 h-4" src="/gambling.png" />
            <p className="text-base pixelify ml-2 hidden md:block">{loginMessage[randomIndex]}</p>
            <p className="text-base pixelify ml-2 block md:hidden">Sign in</p>
        </a>
    </div>
    )
}