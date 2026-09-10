"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Terminal, RotateCcw, ArrowLeft } from "lucide-react";

type Player = "X" | "O" | null;
type Difficulty = "EASY" | "MEDIUM" | "HARD";

// Minimax algorithm for Hard AI
const calculateWinner = (squares: Player[]) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const getAvailableMoves = (squares: Player[]) => {
  return squares.map((sq, i) => (sq === null ? i : null)).filter((val) => val !== null) as number[];
};

const minimax = (squares: Player[], depth: number, isMaximizing: boolean): number => {
  const winner = calculateWinner(squares);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (getAvailableMoves(squares).length === 0) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of getAvailableMoves(squares)) {
      squares[move] = "O";
      const score = minimax(squares, depth + 1, false);
      squares[move] = null;
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of getAvailableMoves(squares)) {
      squares[move] = "X";
      const score = minimax(squares, depth + 1, true);
      squares[move] = null;
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
};

const getBestMove = (squares: Player[]) => {
  let bestScore = -Infinity;
  let move = -1;
  const availableMoves = getAvailableMoves(squares);
  
  if (availableMoves.length === 9) {
    // Optimization: first move random corner or center to speed up
    const firstMoves = [0, 2, 4, 6, 8];
    return firstMoves[Math.floor(Math.random() * firstMoves.length)];
  }

  for (const m of availableMoves) {
    squares[m] = "O";
    const score = minimax(squares, 0, false);
    squares[m] = null;
    if (score > bestScore) {
      bestScore = score;
      move = m;
    }
  }
  return move;
};

const getRandomMove = (squares: Player[]) => {
  const available = getAvailableMoves(squares);
  return available[Math.floor(Math.random() * available.length)];
};

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>("HARD");
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });
  const [gameStatus, setGameStatus] = useState<"PLAYING" | "WON" | "DRAW">("PLAYING");
  const [winner, setWinner] = useState<Player>(null);

  const checkGameEnd = useCallback((currentBoard: Player[]) => {
    const win = calculateWinner(currentBoard);
    if (win) {
      setGameStatus("WON");
      setWinner(win);
      setScores(prev => ({ ...prev, [win]: prev[win as keyof typeof prev] + 1 }));
      return true;
    } else if (currentBoard.every(sq => sq !== null)) {
      setGameStatus("DRAW");
      setScores(prev => ({ ...prev, Draws: prev.Draws + 1 }));
      return true;
    }
    return false;
  }, []);

  const handleClick = (i: number) => {
    if (board[i] || gameStatus !== "PLAYING" || !xIsNext) return;

    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);
    setXIsNext(false);

    if (!checkGameEnd(newBoard)) {
      // AI Turn
      setTimeout(() => {
        let aiMove = -1;
        if (difficulty === "EASY") {
          aiMove = getRandomMove(newBoard);
        } else if (difficulty === "MEDIUM") {
          // 50% random, 50% optimal
          aiMove = Math.random() > 0.5 ? getBestMove(newBoard) : getRandomMove(newBoard);
        } else {
          aiMove = getBestMove(newBoard);
        }
        
        const aiBoard = [...newBoard];
        aiBoard[aiMove] = "O";
        setBoard(aiBoard);
        setXIsNext(true);
        checkGameEnd(aiBoard);
      }, 500); // Artificial delay
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus("PLAYING");
    setWinner(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md border border-neutral-800 bg-neutral-900/50 p-6 rounded relative overflow-hidden">
        {/* Terminal Header */}
        <header className="flex items-center justify-between mb-8 border-b border-neutral-800 pb-4">
          <Link href="/arcade" className="text-neutral-500 hover:text-accent transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-accent" />
            <h1 className="font-bold tracking-widest text-neutral-200">TIC-TAC-TOE</h1>
          </div>
          <div className="w-5" /> {/* Spacer for centering */}
        </header>

        {/* Status Area */}
        <div className="flex justify-between items-end mb-6 text-sm">
          <div>
            <div className="text-neutral-500 mb-1">STATUS</div>
            <div className={`font-bold tracking-wider ${gameStatus === "PLAYING" ? "text-accent" : (winner === "X" ? "text-green-400" : winner === "O" ? "text-red-400" : "text-yellow-400")}`}>
              {gameStatus === "PLAYING" 
                ? (xIsNext ? "PLAYER TURN (X)" : "AI COMPUTING...") 
                : gameStatus === "WON" 
                  ? `${winner === "X" ? "PLAYER" : "AI"} WINS!`
                  : "SYSTEM DRAW"}
            </div>
          </div>
          <div className="text-right">
            <div className="text-neutral-500 mb-1">DIFFICULTY</div>
            <select 
              className="bg-neutral-800 border border-neutral-700 text-xs p-1 rounded outline-none text-white focus:border-accent"
              value={difficulty}
              onChange={(e) => { setDifficulty(e.target.value as Difficulty); resetGame(); }}
              disabled={gameStatus === "PLAYING" && !xIsNext}
            >
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 mb-8 relative">
          <style>{`
            .draw-path {
              stroke-dasharray: 300;
              stroke-dashoffset: 300;
              animation: draw 0.4s ease-out forwards;
            }
            .draw-path-delay {
              stroke-dasharray: 300;
              stroke-dashoffset: 300;
              animation: draw 0.4s ease-out 0.2s forwards;
            }
            @keyframes draw {
              to { stroke-dashoffset: 0; }
            }
          `}</style>

          {!xIsNext && gameStatus === "PLAYING" && (
            <div className="absolute inset-0 bg-transparent z-10" /> // Prevent clicks during AI turn
          )}
          {board.map((sq, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={sq !== null || gameStatus !== "PLAYING"}
              className={`aspect-square flex items-center justify-center text-4xl border border-neutral-800 bg-neutral-800/30 transition-all
                ${!sq && gameStatus === "PLAYING" ? "hover:bg-neutral-800 hover:border-neutral-600 cursor-pointer" : "cursor-default"}
              `}
            >
              {sq === "X" && (
                <svg viewBox="0 0 100 100" className="w-16 h-16 text-white overflow-visible" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                  <path className="draw-path" d="M 22 22 C 35 40 65 75 80 82" />
                  <path className="draw-path-delay" d="M 82 18 C 60 40 40 60 18 85" />
                </svg>
              )}
              {sq === "O" && (
                <svg viewBox="0 0 100 100" className="w-14 h-14 text-accent overflow-visible" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                  <path className="draw-path" d="M 45 15 C 10 20 10 80 50 85 C 90 85 90 20 55 12" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Footer Stats & Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
          <div className="flex gap-4 text-xs tracking-widest text-neutral-400">
            <div>P: {scores.X}</div>
            <div>D: {scores.Draws}</div>
            <div>AI: {scores.O}</div>
          </div>
          
          <button 
            onClick={resetGame}
            className="flex items-center gap-2 text-xs tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            RESTART
          </button>
        </div>
      </div>
    </div>
  );
}
