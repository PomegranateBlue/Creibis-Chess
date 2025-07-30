import React, { useRef, useState } from "react";
import {
  Chessboard,
  type SquareHandlerArgs,
  type PieceDropHandlerArgs,
  type ChessboardOptions,
} from "react-chessboard";
import { Chess, type Square } from "chess.js";

const App = () => {
  const chessRef = useRef(new Chess());
  const chessGame = chessRef.current;

  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const [moveFrom, setMoveFrom] = useState<string>("");
  const [optionSquares, setOptionSquares] = useState({});
  // const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // CPU 랜덤 이동
  const makeRandomMove = () => {
    const possibleMoves = chessGame.moves();

    if (chessGame.isGameOver()) {
      return;
    }

    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    chessGame.move(randomMove);
    setChessPosition(chessGame.fen());
  };

  const getMoveOptions = (square: Square) => {
    const moves = chessGame.moves({
      square,
      verbose: true,
    });

    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, React.CSSProperties> = {};

    for (const move of moves) {
      newSquares[move.to] = {
        background:
          chessGame.get(move.to) &&
          chessGame.get(move.to)?.color !== chessGame.get(square)?.color
            ? "radial-gradient(circle,rgba(0,0,0,.1) 85%,transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    }

    newSquares[square] = {
      background: "rgba(255,255,0,0.4);",
    };

    setOptionSquares(newSquares);
    return true;
  };

  const onSquareClick = ({ square, piece }: SquareHandlerArgs) => {
    if (!moveFrom && piece) {
      const hasMoveOptions = getMoveOptions(square as Square);

      if (hasMoveOptions) {
        setMoveFrom(square);
      }
      return;
    }
    const moves = chessGame.moves({
      square: moveFrom as Square,
      verbose: true,
    });
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    if (!foundMove) {
      const hasMoveOptions = getMoveOptions(square as Square);

      setMoveFrom(hasMoveOptions ? square : "");
      return;
    }

    try {
      chessGame.move({
        from: moveFrom,
        to: square,
        promotion: "q",
      });
    } catch {
      const hasMoveOptions = getMoveOptions(square as Square);

      if (hasMoveOptions) {
        setMoveFrom(square);
      }
      return;
    }

    setChessPosition(chessGame.fen());
    setTimeout(makeRandomMove, 300);

    setMoveFrom("");
    setOptionSquares({});
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
        promotion: "q",
      });

      setChessPosition(chessGame.fen());

      setMoveFrom("");
      setOptionSquares({});

      setTimeout(makeRandomMove, 500);

      return true;
    } catch {
      return false;
    }
  };

  const chessboardOptions: ChessboardOptions = {
    onPieceDrop,
    onSquareClick,
    position: chessPosition,
    squareStyles: optionSquares,
    id: "click-or-drag-to-move",
  };

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <section className="flex-1 flex items-center justify-center">
        <h1 className="text-[48px] font-extrabold italic tracking-widest text-black border border-white [text-shadow:0_2px_0_white,2px_0_0_white,0_-2px_0_white,-2px_0_0_white]">
          Creibis Chess
        </h1>
      </section>
      <section className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[640px] aspect-square">
          <Chessboard options={chessboardOptions} />
        </div>
      </section>
      <section className="flex-1 flex items-center justify-center">
        Another Info
      </section>
    </main>
  );
};

export default App;
