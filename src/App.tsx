import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import { useRef, useState, useEffect } from "react";
import { Chess } from "chess.js";
const App = () => {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;

  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  /**
   * fen= Forsyth-Edwards Notation은 체스 기물 배치 상태와 현재 게임 상태를 문자열로
   * 압축해서 나타내는 포맷
   * 6개의 필드로 구성
   *
   */
  const makeRandomMoves = () => {
    const possibleMoves = chessGame.moves();

    if (chessGame.isGameOver()) {
      return;
    }

    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    chessGame.move(randomMove);
    setChessPosition(chessGame.fen());
  };

  const onPieceDrop = ({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs) => {
    if (!targetSquare) {
      return false;
    }

    try {
      chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // 항상 queen으로 지정해서 승급할 것,나중에 q,r,k,b에서 선택할 수 있도록하기
      });
      setChessPosition(chessGame.fen());
      // 기존 타이머가 있으면 제거
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      // 게임이 끝나지 않았을 때만 AI의 랜덤 move 예약
      if (!chessGame.isGameOver()) {
        moveTimeoutRef.current = setTimeout(makeRandomMoves, 500);
      }
      return true;
    } catch {
      return false;
    }
  };

  const chessboardOptions = {
    position: chessPosition,
    onPieceDrop,
    id: "play-vs-random",
  };
  // 언마운트 시 타이머 제거
  useEffect(() => {
    return () => {
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <main className="flex items-center flex-row justify-center overflow-hidden h-screen w-screen ">
      <section className="flex flex-1 items-center justify-center">
        <h1 className=" border-white border tracking-widest font-extrabold italic text-[48px] [text-shadow:0_2px_0_white,2px_0_0_white,0_-2px_0_white,-2px_0_0_white] text-black">
          Creibis Chess
        </h1>
      </section>
      <section className="flex flex-1 items-center justify-center ">
        <div className="w-full max-w-[640px] aspect-square">
          <Chessboard options={chessboardOptions} />
        </div>
      </section>
      <section className="flex flex-1 items-center justify-center">
        Another Info
      </section>
    </main>
  );
};
export default App;
