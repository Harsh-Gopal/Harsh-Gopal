"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Terminal, ArrowLeft, RotateCcw, Pause, ChevronLeft, ChevronRight, ChevronDown, ArrowDownToLine } from "lucide-react";
import { createBoard, randomTetromino, checkCollision, BOARD_HEIGHT, BOARD_WIDTH, Board, PlayerState, Cell } from "@/lib/games/tetris";

const useBoard = (player: PlayerState, resetPlayer: () => void) => {
  const [board, setBoard] = useState<Board>(createBoard());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    let currentRowsCleared = 0;
    const sweepRows = (newBoard: Board) =>
      newBoard.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          currentRowsCleared += 1;
          ack.unshift(new Array(BOARD_WIDTH).fill([0, 'bg-transparent']));
          return ack;
        }
        ack.push(row);
        return ack;
      }, [] as Board);

    const updateBoard = (prevBoard: Board) => {
      // Flush the board
      const newBoard = prevBoard.map(row =>
        row.map((cell) => (cell[1] !== 'bg-transparent' ? cell : [0, 'bg-transparent'] as Cell))
      );

      // Draw tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newBoard[y + player.pos.y][x + player.pos.x] = [
              value,
              player.color,
            ];
          }
        });
      });

      // Check for collisions and merge if needed
      if (player.collided) {
        resetPlayer();
        const sweptBoard = sweepRows(newBoard);
        if (currentRowsCleared > 0) {
           setRowsCleared(currentRowsCleared);
        } else {
           setRowsCleared(0);
        }
        return sweptBoard;
      } else {
        setRowsCleared(0);
      }

      return newBoard;
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBoard(prev => updateBoard(prev));
  }, [player, resetPlayer]);

  return { board, setBoard, rowsCleared };
};

const usePlayer = () => {
  const [player, setPlayer] = useState<PlayerState>({
    pos: { x: 0, y: 0 },
    tetromino: [[0]],
    color: 'bg-transparent',
    collided: false,
  });

  const [nextPiece, setNextPiece] = useState(randomTetromino());

  const rotate = (matrix: number[][], dir: number) => {
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map(col => col[index])
    );
    if (dir > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = useCallback((board: Board, dir: number) => {
    setPlayer(prev => {
      const clonedPlayer = JSON.parse(JSON.stringify(prev)) as PlayerState;
      clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

      const pos = clonedPlayer.pos.x;
      let offset = 1;
      while (checkCollision(clonedPlayer, board, { x: 0, y: 0 })) {
        clonedPlayer.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > clonedPlayer.tetromino[0].length) {
          rotate(clonedPlayer.tetromino, -dir); // Rotate back
          clonedPlayer.pos.x = pos;
          return prev;
        }
      }
      return clonedPlayer;
    });
  }, []);

  const updatePlayerPos = useCallback(({ x, y, collided }: { x: number, y: number, collided: boolean }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x + x), y: (prev.pos.y + y) },
      collided,
    }));
  }, []);

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
      tetromino: nextPiece.shape,
      color: nextPiece.color,
      collided: false,
    });
    setNextPiece(randomTetromino());
  }, [nextPiece]);

  return { player, updatePlayerPos, resetPlayer, playerRotate, nextPiece };
};

export default function Tetris() {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(1);

  const { player, updatePlayerPos, resetPlayer, playerRotate, nextPiece } = usePlayer();
  const { board, setBoard, rowsCleared } = useBoard(player, resetPlayer);

  const movePlayer = useCallback((dir: number) => {
    if (!checkCollision(player, board, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  }, [player, board, updatePlayerPos]);

  const startGame = useCallback(() => {
    setBoard(createBoard());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setIsPaused(false);
    setScore(0);
    setRows(0);
    setLevel(1);
  }, [resetPlayer, setBoard]);

  // Start game on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pauseGame = useCallback(() => {
    if (gameOver) return;
    setIsPaused(prev => {
      const nextPaused = !prev;
      if (nextPaused) {
        setDropTime(null);
      } else {
        setDropTime(1000 / (level + 1) + 200);
      }
      return nextPaused;
    });
  }, [gameOver, level]);

  const drop = useCallback(() => {
    if (rowsCleared > 0) {
      setScore(prev => prev + [40, 100, 300, 1200][rowsCleared - 1] * level);
      setRows(prev => prev + rowsCleared);
      setLevel(prev => Math.floor((prev + rowsCleared) / 10) + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, board, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }, [player, board, updatePlayerPos, rowsCleared, level]);

  const dropPlayer = useCallback(() => {
    setDropTime(null);
    drop();
  }, [drop]);

  const hardDrop = useCallback(() => {
    let yOffset = 0;
    while (!checkCollision(player, board, { x: 0, y: yOffset + 1 })) {
      yOffset += 1;
    }
    updatePlayerPos({ x: 0, y: yOffset, collided: true });
  }, [player, board, updatePlayerPos]);

  const move = useCallback((e: KeyboardEvent) => {
    if (!gameOver && !isPaused) {
      if (e.keyCode === 37) movePlayer(-1);
      else if (e.keyCode === 39) movePlayer(1);
      else if (e.keyCode === 40) dropPlayer();
      else if (e.keyCode === 38) playerRotate(board, 1);
      else if (e.keyCode === 32) hardDrop();
    }
    if (e.keyCode === 80) pauseGame();
  }, [gameOver, isPaused, board, playerRotate, movePlayer, dropPlayer, hardDrop, pauseGame]);

  const keyUp = useCallback((e: KeyboardEvent) => {
    if (!gameOver && !isPaused) {
      if (e.keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  }, [gameOver, isPaused, level]);

  useEffect(() => {
    document.addEventListener("keydown", move);
    document.addEventListener("keyup", keyUp);
    return () => {
      document.removeEventListener("keydown", move);
      document.removeEventListener("keyup", keyUp);
    };
  }, [move, keyUp]);

  // Hook for game loop
  const requestRef = useRef<number>(undefined);
  const previousTimeRef = useRef<number>(undefined);
  const dropRef = useRef(drop);

  useEffect(() => {
    dropRef.current = drop;
  }, [drop]);

  useEffect(() => {
    const gameLoop = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        if (dropTime && deltaTime > dropTime) {
          dropRef.current();
          previousTimeRef.current = time;
        }
      } else {
        previousTimeRef.current = time;
      }
      
      if (dropTime !== null) {
        requestRef.current = requestAnimationFrame(gameLoop);
      }
    };

    if (dropTime !== null) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = undefined;
    };
  }, [dropTime]);


  return (
    <div className="min-h-screen bg-background text-foreground font-mono flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl border border-neutral-800 bg-neutral-900/50 p-6 rounded relative overflow-hidden flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Game Board */}
        <div className="flex-shrink-0 flex flex-col">
          <header className="flex items-center gap-2 mb-4">
            <Link href="/arcade" className="text-neutral-500 hover:text-accent transition-colors mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Terminal className="w-4 h-4 text-accent" />
            <h1 className="font-bold tracking-widest text-neutral-200">TETRIS</h1>
          </header>

          <div 
            className="border-2 border-neutral-800 bg-neutral-950 p-1 relative w-fit"
            style={{ 
              display: 'grid', 
              gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1.25rem)`, 
              gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1.25rem)`,
              gap: '1px'
            }}
          >
            {board.map((row) =>
              row.map((cell, x) => (
                <div 
                  key={x} 
                  className={`w-5 h-5 ${cell[0] === 0 ? 'bg-neutral-900' : cell[1]} border border-white/10`} 
                />
              ))
            )}
            
            {/* Overlays */}
            {gameOver && (
              <div className="absolute inset-0 bg-neutral-950/80 flex flex-col items-center justify-center text-center p-4 z-10">
                <div className="text-2xl font-bold text-accent mb-2">GAME OVER</div>
                <button 
                  onClick={startGame}
                  className="px-4 py-2 border border-neutral-700 hover:border-accent text-sm tracking-widest uppercase transition-colors"
                >
                  START NEW GAME
                </button>
              </div>
            )}
            {!gameOver && isPaused && (
              <div className="absolute inset-0 bg-neutral-950/80 flex flex-col items-center justify-center text-center p-4 z-10">
                <div className="text-2xl font-bold text-accent mb-2">PAUSED</div>
                <div className="text-xs text-neutral-500">Press P to resume</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Stats & Info */}
        <div className="flex flex-col gap-6 w-full lg:w-48 mt-12 lg:mt-0">
          
          <div className="bg-neutral-950 border border-neutral-800 p-4">
            <div className="text-xs text-neutral-500 mb-2">NEXT SEQUENCE</div>
            <div 
              style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1rem)', gridTemplateColumns: 'repeat(4, 1rem)', gap: '1px' }}
            >
              {nextPiece?.shape.map((row, y) => 
                row.map((val, x) => (
                  <div key={`${x}-${y}`} className={`w-4 h-4 ${val !== 0 ? nextPiece.color : 'bg-transparent'}`} />
                ))
              )}
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 p-4 space-y-4">
            <div>
              <div className="text-xs text-neutral-500">SCORE</div>
              <div className="text-xl font-bold text-white">{score}</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500">LINES</div>
              <div className="text-xl font-bold text-white">{rows}</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500">LEVEL</div>
              <div className="text-xl font-bold text-white">{level}</div>
            </div>
          </div>

          {/* Controls (Desktop/Info & Mobile touch) */}
          <div className="bg-neutral-950 border border-neutral-800 p-4">
             <div className="text-xs text-neutral-500 mb-2">CONTROLS</div>
             <div className="text-xs text-neutral-400 space-y-1 hidden lg:block">
               <p>&uarr; ROTATE</p>
               <p>&larr; &rarr; MOVE</p>
               <p>&darr; DROP</p>
               <p>SPACE - HARD DROP</p>
               <p>P - PAUSE</p>
             </div>
             
             {/* Mobile Touch Controls */}
             <div className="grid grid-cols-3 gap-2 lg:hidden mt-2">
                <button onClick={pauseGame} className="col-span-3 p-3 bg-neutral-800 active:bg-neutral-700 flex justify-center"><Pause className="w-5 h-5"/></button>
                <button onClick={() => movePlayer(-1)} className="p-3 bg-neutral-800 active:bg-neutral-700 flex justify-center"><ChevronLeft className="w-5 h-5"/></button>
                <button onClick={() => playerRotate(board, 1)} className="p-3 bg-neutral-800 active:bg-neutral-700 flex justify-center text-accent"><RotateCcw className="w-5 h-5"/></button>
                <button onClick={() => movePlayer(1)} className="p-3 bg-neutral-800 active:bg-neutral-700 flex justify-center"><ChevronRight className="w-5 h-5"/></button>
                <button onClick={dropPlayer} className="col-span-1 p-3 bg-neutral-800 active:bg-neutral-700 flex justify-center"><ChevronDown className="w-5 h-5"/></button>
                <button onClick={hardDrop} className="col-span-2 p-3 bg-neutral-800 active:bg-neutral-700 flex justify-center text-accent"><ArrowDownToLine className="w-5 h-5"/></button>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
