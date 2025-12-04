// import { type PieceDropHandlerArgs } from "react-chessboard";

// export const onPieceDrop = ({
//   sourceSquare,
//   targetSquare,
// }: PieceDropHandlerArgs) => {
//   if (!targetSquare) {
//     return false;
//   }

//   try {
//     chessGame.move({
//       from: sourceSquare,
//       to: targetSquare,
//       promotion: "q",
//     });

//     setChessPosition(chessGame.fen());

//     setMoveFrom("");
//     setOptionSquares({});

//     setTimeout(makeRandomMove, 500);

//     return true;
//   } catch {
//     return false;
//   }
// };
