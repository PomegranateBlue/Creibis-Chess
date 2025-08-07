// 체스 게임 1판을 위한 컴포넌트
import { useRef } from "react";

const ChessGame = () => {
  const chessRef = useRef(new Chess());
  const chessGame = chessRef.current;
};

export default ChessGame;
