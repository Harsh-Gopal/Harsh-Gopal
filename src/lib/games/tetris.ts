export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export type Cell = [number, string];
export type Board = Cell[][];
export type PlayerState = {
  pos: { x: number, y: number };
  tetromino: number[][];
  color: string;
  collided: boolean;
};

export const TETROMINOS: Record<TetrominoType, { shape: number[][], color: string }> = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    color: 'bg-cyan-500'
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ],
    color: 'bg-blue-500'
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ],
    color: 'bg-orange-500'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'bg-yellow-500'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: 'bg-green-500'
  },
  T: {
    shape: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    color: 'bg-purple-500'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: 'bg-red-500'
  }
};

export const randomTetromino = () => {
  const tetrominos = "IJLOSTZ" as const;
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)] as TetrominoType;
  return TETROMINOS[randTetromino];
};

export const createBoard = (): Board =>
  Array.from(Array(BOARD_HEIGHT), () =>
    new Array(BOARD_WIDTH).fill([0, 'bg-transparent'])
  );

export const checkCollision = (
  player: { pos: { x: number, y: number }, tetromino: number[][] },
  board: Board,
  { x: moveX, y: moveY }: { x: number, y: number }
) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      if (player.tetromino[y][x] !== 0) {
        if (
          !board[y + player.pos.y + moveY] ||
          !board[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          board[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            'bg-transparent'
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
