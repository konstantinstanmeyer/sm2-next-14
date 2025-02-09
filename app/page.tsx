import Language from "./Language";
import PixelCanvas from "./PixelCanvas";


export default function Home() {
  const sample = {

  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Language />
      <PixelCanvas />
    </div>
  );
}
