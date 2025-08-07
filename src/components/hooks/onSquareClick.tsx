import { type SquareHandlerArgs } from "react-chessboard";

export const onSquareClick = ({ square, piece }: SquareHandlerArgs) => {
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
