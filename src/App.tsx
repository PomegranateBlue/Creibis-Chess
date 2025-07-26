import { Chessboard } from "react-chessboard";

const App = () => {
  return (
    <main className="flex flex-1/3 items-center flex-row justify-center overflow-hidden h-screen w-screen ">
      <section>
        <h1 className="flex flex-1/2 border-white border tracking-widest font-extrabold italic text-[48px] [text-shadow:0_2px_0_white,2px_0_0_white,0_-2px_0_white,-2px_0_0_white] text-black">
          Creibis Chess
        </h1>
      </section>
      <section className="flex flex-1/3 w-full aspect-square max-w-[640px]    max-h-[640px]">
        <Chessboard />
      </section>
      <section className="flex flex-1/3">Another Info</section>
    </main>
  );
};
export default App;
