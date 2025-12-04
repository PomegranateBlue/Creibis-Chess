import React, { useState } from "react";
import {
  Chessboard,
  type SquareHandlerArgs,
  type PieceDropHandlerArgs,
  type ChessboardOptions,
} from "react-chessboard";
import { type Square } from "chess.js";
import { useGameStore } from "./store/useChessStore";
const App = () => {
  const { game, position, makeMove, setPosition, isStarted, isGameOver, gameResult, startGame, resetGame } = useGameStore();
  const [moveFrom, setMoveFrom] = useState<string>("");
  const [optionSquares, setOptionSquares] = useState({});

  // CPU 랜덤 이동
  const makeRandomMove = () => {
    const possibleMoves = game.moves();
    if (game.isGameOver() || possibleMoves.length === 0) {
      return;
    }
    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    const move = game.move(randomMove);
    if (move) {
      setPosition(game.fen());

      // 게임 오버 체크
      if (game.isGameOver()) {
        let result = null;
        if (game.isCheckmate()) {
          result = game.turn() === "w" ? "Black wins by checkmate!" : "White wins by checkmate!";
        } else if (game.isDraw()) {
          result = "Game drawn!";
        } else if (game.isStalemate()) {
          result = "Game drawn by stalemate!";
        } else if (game.isThreefoldRepetition()) {
          result = "Game drawn by threefold repetition!";
        } else if (game.isInsufficientMaterial()) {
          result = "Game drawn by insufficient material!";
        }

        useGameStore.setState({ isGameOver: true, gameResult: result });
      }
    }
  };

  const getMoveOptions = (square: Square) => {
    const moves = game.moves({
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
          game.get(move.to) &&
          game.get(move.to)?.color !== game.get(square)?.color
            ? "radial-gradient(circle,rgba(0,0,0,.1) 85%,transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    }

    newSquares[square] = {
      background: "rgba(255,255,0,0.4)",
    };

    setOptionSquares(newSquares);
    return true;
  };

  const onSquareClick = ({ square, piece }: SquareHandlerArgs) => {
    if (!isStarted || isGameOver) return;

    if (!moveFrom && piece) {
      const hasMoveOptions = getMoveOptions(square as Square);

      if (hasMoveOptions) {
        setMoveFrom(square);
      }
      return;
    }
    const moves = game.moves({
      square: moveFrom as Square,
      verbose: true,
    });
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    if (!foundMove) {
      const hasMoveOptions = getMoveOptions(square as Square);

      setMoveFrom(hasMoveOptions ? square : "");
      return;
    }

    if (makeMove(moveFrom, square)) {
      setMoveFrom("");
      setOptionSquares({});
      setTimeout(makeRandomMove, 300);
    } else {
      const hasMoveOptions = getMoveOptions(square as Square);
      if (hasMoveOptions) {
        setMoveFrom(square);
      }
    }
  };

  const onPieceDrop = ({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs) => {
    if (!isStarted || isGameOver) return false;

    if (!targetSquare) {
      return false;
    }

    if (makeMove(sourceSquare, targetSquare)) {
      setMoveFrom("");
      setOptionSquares({});
      setTimeout(makeRandomMove, 300);
      return true;
    }
    return false;
  };

  const chessboardOptions: ChessboardOptions = {
    onPieceDrop,
    onSquareClick,
    position: position,
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
      <section className="flex-1 flex items-center justify-center relative">
        <div className="w-full max-w-[640px] aspect-square">
          <Chessboard options={chessboardOptions} />
        </div>

        {!isStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-2xl font-bold rounded-lg shadow-lg transition-colors"
            >
              Start Game
            </button>
          </div>
        )}

        {isGameOver && gameResult && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Game Over!</h2>
              <p className="text-xl mb-6 text-gray-700">{gameResult}</p>
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-lg shadow-lg transition-colors"
              >
                Restart Game
              </button>
            </div>
          </div>
        )}
      </section>
      <section className="flex-1 flex items-center justify-center">
        Another Info
      </section>
    </main>
  );
};

export default App;
