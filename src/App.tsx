import { Chessboard } from "react-chessboard";
import { useRef } from "react";
import { Chess } from "chess.js";
const App = () => {
  const chessGameRef = useRef(new Chess());

  const chessGame = chessGameRef.current;
  return (
    <main className="flex items-center flex-row justify-center overflow-hidden h-screen w-screen ">
      <section className="flex flex-1 items-center justify-center">
        <h1 className=" border-white border tracking-widest font-extrabold italic text-[48px] [text-shadow:0_2px_0_white,2px_0_0_white,0_-2px_0_white,-2px_0_0_white] text-black">
          Creibis Chess
        </h1>
      </section>
      <section className="flex flex-1 items-center justify-center ">
        <div className="w-full max-w-[640px] aspect-square">
          <Chessboard />
        </div>
      </section>
      <section className="flex flex-1 items-center justify-center">
        Another Info
      </section>
    </main>
  );
};
export default App;
