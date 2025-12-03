import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCcw, Trophy, Timer, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface MazeGameProps {
  onBack: () => void;
}

interface Position {
  row: number;
  col: number;
}

const difficulties = {
  easy: {
    name: 'Easy (10x10)',
    size: 10,
    complexity: 0.25
  },
  medium: {
    name: 'Medium (15x15)',
    size: 15,
    complexity: 0.3
  },
  hard: {
    name: 'Hard (20x20)',
    size: 20,
    complexity: 0.35
  }
};

type Difficulty = keyof typeof difficulties;

export function MazeGame({ onBack }: MazeGameProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [maze, setMaze] = useState<number[][]>([]);
  const [playerPos, setPlayerPos] = useState<Position>({ row: 0, col: 0 });
  const [playerDirection, setPlayerDirection] = useState<'up' | 'down' | 'left' | 'right'>('right');
  const [endPos, setEndPos] = useState<Position>({ row: 0, col: 0 });
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentDifficulty = difficulties[difficulty];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    generateMaze();
  }, [difficulty]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !gameWon) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameWon]);

  useEffect(() => {
    if (playerPos.row === endPos.row && playerPos.col === endPos.col && isPlaying) {
      setGameWon(true);
      setIsPlaying(false);
    }
  }, [playerPos, endPos, isPlaying]);

  // BFS to check if path exists and return the path
  const findPath = (maze: number[][], start: Position, end: Position): Position[] | null => {
    const size = maze.length;
    const visited = Array(size).fill(null).map(() => Array(size).fill(false));
    const queue: { pos: Position; path: Position[] }[] = [{ pos: start, path: [start] }];
    visited[start.row][start.col] = true;

    const directions = [
      { dr: -1, dc: 0 },  // up
      { dr: 1, dc: 0 },   // down
      { dr: 0, dc: -1 },  // left
      { dr: 0, dc: 1 }    // right
    ];

    while (queue.length > 0) {
      const { pos, path } = queue.shift()!;

      if (pos.row === end.row && pos.col === end.col) {
        return path;
      }

      for (const { dr, dc } of directions) {
        const newRow = pos.row + dr;
        const newCol = pos.col + dc;

        if (
          newRow >= 0 && newRow < size &&
          newCol >= 0 && newCol < size &&
          maze[newRow][newCol] === 1 &&
          !visited[newRow][newCol]
        ) {
          visited[newRow][newCol] = true;
          queue.push({
            pos: { row: newRow, col: newCol },
            path: [...path, { row: newRow, col: newCol }]
          });
        }
      }
    }

    return null;
  };

  // Carve a path from start to end if none exists
  const carvePath = (maze: number[][], start: Position, end: Position) => {
    // Simple path carving - create a guaranteed path
    let row = start.row;
    let col = start.col;

    // Move right and down to reach the end
    while (row < end.row || col < end.col) {
      maze[row][col] = 1;
      
      // Randomly choose to move right or down (if possible)
      if (row < end.row && col < end.col) {
        if (Math.random() > 0.5) {
          row++;
        } else {
          col++;
        }
      } else if (row < end.row) {
        row++;
      } else {
        col++;
      }
    }
    maze[end.row][end.col] = 1;
  };

  const generateMaze = () => {
    const size = currentDifficulty.size;
    // 0 = wall, 1 = path
    const newMaze: number[][] = Array(size).fill(null).map(() => Array(size).fill(0));

    // Recursive backtracking algorithm
    const carve = (row: number, col: number) => {
      newMaze[row][col] = 1;

      const directions = [
        { dr: -2, dc: 0 },  // up
        { dr: 2, dc: 0 },   // down
        { dr: 0, dc: -2 },  // left
        { dr: 0, dc: 2 }    // right
      ].sort(() => Math.random() - 0.5);

      for (const { dr, dc } of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 && newRow < size &&
          newCol >= 0 && newCol < size &&
          newMaze[newRow][newCol] === 0
        ) {
          newMaze[row + dr / 2][col + dc / 2] = 1;
          carve(newRow, newCol);
        }
      }
    };

    carve(0, 0);

    // Ensure start and end positions are always paths
    newMaze[0][0] = 1;
    newMaze[size - 1][size - 1] = 1;

    // Check if a path exists from start to end
    const start = { row: 0, col: 0 };
    const end = { row: size - 1, col: size - 1 };
    let path = findPath(newMaze, start, end);

    // If no path exists, carve one
    if (!path) {
      carvePath(newMaze, start, end);
    }

    // Add some random paths to make it less linear (but not too many)
    const extraPaths = Math.floor(size * size * currentDifficulty.complexity * 0.5);
    for (let i = 0; i < extraPaths; i++) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      newMaze[row][col] = 1;
    }

    // Final verification - ensure path still exists after adding random paths
    path = findPath(newMaze, start, end);
    if (!path) {
      carvePath(newMaze, start, end);
    }
    
    setMaze(newMaze);
    setPlayerPos({ row: 0, col: 0 });
    setPlayerDirection('right');
    setEndPos({ row: size - 1, col: size - 1 });
    setGameWon(false);
    setMoves(0);
    setTime(0);
    setIsPlaying(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (gameWon) return;

    if (!isPlaying) {
      setIsPlaying(true);
    }

    let newRow = playerPos.row;
    let newCol = playerPos.col;
    let direction: 'up' | 'down' | 'left' | 'right' = playerDirection;

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        newRow = Math.max(0, playerPos.row - 1);
        direction = 'up';
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        newRow = Math.min(maze.length - 1, playerPos.row + 1);
        direction = 'down';
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        newCol = Math.max(0, playerPos.col - 1);
        direction = 'left';
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        newCol = Math.min(maze[0].length - 1, playerPos.col + 1);
        direction = 'right';
        break;
      default:
        return;
    }

    // Check if new position is a path (not a wall)
    if (maze[newRow][newCol] === 1) {
      setPlayerPos({ row: newRow, col: newCol });
      setPlayerDirection(direction);
      setMoves(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, maze, gameWon, isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameWon || maze[row][col] === 0) return;

    if (!isPlaying) {
      setIsPlaying(true);
    }

    // Check if clicked cell is adjacent to player
    const rowDiff = row - playerPos.row;
    const colDiff = col - playerPos.col;

    if ((Math.abs(rowDiff) === 1 && colDiff === 0) || (rowDiff === 0 && Math.abs(colDiff) === 1)) {
      let direction: 'up' | 'down' | 'left' | 'right' = playerDirection;
      
      if (rowDiff === -1) direction = 'up';
      else if (rowDiff === 1) direction = 'down';
      else if (colDiff === -1) direction = 'left';
      else if (colDiff === 1) direction = 'right';
      
      setPlayerPos({ row, col });
      setPlayerDirection(direction);
      setMoves(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFFFFF] to-[#F0F9FF] py-8 px-4">
      <div className="container mx-auto max-w-6xl mt-[80px] mr-[0px] mb-[0px] ml-[0px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="rounded-full px-4 py-4 sm:px-6 sm:py-6 border-2 border-[#FF6B9D] text-[#FF6B9D] hover:bg-[#FF6B9D] hover:text-white transition-all self-start sm:self-center"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Back to Games
          </Button>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-[24px] sm:text-[32px] text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2 font-bold">
            Maze Adventure 🐑
          </h1>
          <div className="hidden sm:block w-32" /> {/* Spacer */}
        </div>

        {/* Game Won Modal */}
        {gameWon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA] text-[28px] mb-4">
                You Made It to our Lord Jesus!
              </h2>
              <div className="space-y-2 mb-6 text-gray-600">
                <p>⏱️ Time: {formatTime(time)}</p>
                <p>👣 Moves: {moves}</p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={generateMaze}
                  className="bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white rounded-full px-6 py-6"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Play Again
                </Button>
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="rounded-full px-6 py-6 border-2 border-[#FF6B9D] text-[#FF6B9D]"
                >
                  Back to Games
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-xl sticky top-8 space-y-6">
              {/* Stats */}
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-[#FFE66D]/20 to-[#FF6B9D]/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Timer className="w-5 h-5 text-[#FF6B9D]" />
                    <span className="text-sm text-gray-600 font-bold font-normal">Time</span>
                  </div>
                  <div className="text-[24px] text-[#FF6B9D] font-bold">
                    {formatTime(time)}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-[#4ECDC4]/20 to-[#A78BFA]/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-[#A78BFA]" />
                    <span className="text-sm text-gray-600 font-bold font-normal">Moves</span>
                  </div>
                  <div className="text-[24px] text-[#A78BFA] font-bold">
                    {moves}
                  </div>
                </div>
              </div>

              {/* Difficulty Selector */}
              <div className="space-y-2">
                <h3 className="text-gray-700 font-semibold">Difficulty</h3>
                {(Object.keys(difficulties) as Difficulty[]).map((diff) => (
                  <Button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`w-full rounded-full px-4 py-4 ${
                      difficulty === diff
                        ? 'bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {difficulties[diff].name}
                  </Button>
                ))}
              </div>

              <Button
                onClick={generateMaze}
                className="w-full rounded-full px-6 py-6 bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                New Maze
              </Button>

              {/* Instructions */}
              <div className="p-4 bg-gradient-to-r from-[#4ECDC4]/10 to-[#A78BFA]/10 rounded-xl">
                <h3 className="text-sm font-semibold mb-2 text-gray-700 font-bold">How to Play</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>🐑 Guide the sheep to our Lord Jesus</p>
                  <p>⌨️ Use arrow keys or WASD</p>
                  <p>👆 Or click/tap adjacent cells</p>
                  <p>🎯 Reach the goal to win!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Maze Grid */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex justify-center items-center">
                <div className="inline-block bg-gradient-to-br from-[#A78BFA]/10 to-[#4ECDC4]/10 p-2 sm:p-4 rounded-2xl overflow-x-auto max-w-full">
                  {maze.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                      {row.map((cell, colIndex) => {
                        const isPlayer = playerPos.row === rowIndex && playerPos.col === colIndex;
                        const isEnd = endPos.row === rowIndex && endPos.col === colIndex;
                        const isPath = cell === 1;

                        return (
                          <motion.div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            whileHover={isPath ? { scale: 1.1 } : {}}
                            className={`
                              w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 
                              border border-gray-200 
                              flex items-center justify-center 
                              transition-all
                              ${isPath ? 'cursor-pointer' : 'cursor-not-allowed'}
                              ${isPath ? 'bg-white' : 'bg-gray-800'}
                            `}
                          >
                            {isPlayer && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ 
                                  scale: 1,
                                  rotate: playerDirection === 'right' ? 0 : 
                                          playerDirection === 'down' ? 90 :
                                          playerDirection === 'left' ? 180 :
                                          playerDirection === 'up' ? 270 : 0
                                }}
                                transition={{ duration: 0.2 }}
                                className="text-sm sm:text-base md:text-xl lg:text-2xl"
                              >
                                🐑
                              </motion.span>
                            )}
                            {isEnd && !isPlayer && (
                              <motion.span
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                                className="text-sm sm:text-base md:text-xl lg:text-2xl"
                              >
                                ✝️
                              </motion.span>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#FFE66D]/20 to-[#FF6B9D]/20 px-6 py-3 rounded-full">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🐑</span>
                    <span className="text-sm text-gray-600">You</span>
                  </div>
                  <div className="w-px h-6 bg-gray-300" />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✝️</span>
                    <span className="text-sm text-gray-600">Our Lord Jesus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
