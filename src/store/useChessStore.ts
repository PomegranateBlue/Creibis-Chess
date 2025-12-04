import { create } from "zustand";
import { Chess } from "chess.js";

interface GameState {
  game: Chess;
  position: string;
  isGameOver: boolean;
  isStarted: boolean;
  gameResult: string | null;

  setPosition: (position: string) => void;
  makeMove: (from: string, to: string) => boolean;
  resetGame: () => void;
  startGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  game: new Chess(),
  position: new Chess().fen(),
  isGameOver: false,
  isStarted: false,
  gameResult: null,

  setPosition: (position) => {
    set({ position });
  },

  makeMove: (from, to) => {
    const { game } = get();
    try {
      game.move({ from, to, promotion: "q" });

      let result = null;
      if (game.isGameOver()) {
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
      }

      set({
        position: game.fen(),
        isGameOver: game.isGameOver(),
        gameResult: result,
      });
      return true;
    } catch {
      return false;
    }
  },

  startGame: () => {
    set({ isStarted: true });
  },

  resetGame: () => {
    const newGame = new Chess();
    set({
      game: newGame,
      position: newGame.fen(),
      isGameOver: false,
      isStarted: false,
      gameResult: null,
    });
  },
}));
