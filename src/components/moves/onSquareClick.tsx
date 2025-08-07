import type { SquareHandlerArgs } from "react-chessboard";
import {useState} from "react"
export const onSquareClick = ({ square, piece }: SquareHandlerArgs) => {
  const [moveFrom, setMoveFrom] = useState<string>("");
  if (!moveFrom && piece) {
    const hasMoveOptions = getMoveOptions(sqaure as Square);
  }
};
