const ChessBorad = () => {
  const chessboardOptions: ChessboardOptions = {
    onPieceDrop,
    onSquareClick,
    position: chessPosition,
    squareStyles: optionSquares,
    id: "click-or-drag-to-move",
  };
};

export default ChessBoard;
