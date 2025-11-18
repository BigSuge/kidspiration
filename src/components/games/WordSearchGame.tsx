import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCcw, Trophy, Sparkles, Search } from 'lucide-react';
import { Button } from '../ui/button';

interface WordSearchGameProps {
  onBack: () => void;
}

interface Word {
  word: string;
  hint: string;
}

interface FoundWord {
  word: string;
  cells: { row: number; col: number }[];
}

const difficulties = {
  easy: {
    name: 'Easy (8x8)',
    size: 8,
    words: [
      { word: 'JESUS', hint: 'Our Savior' },
      { word: 'HEAL', hint: 'To make well' },
      { word: 'LOVE', hint: 'God is...' },
      { word: 'FAITH', hint: 'Belief in God' },
      { word: 'PRAY', hint: 'Talk to God' },
    ]
  },
  medium: {
    name: 'Medium (12x12)',
    size: 12,
    words: [
      { word: 'MIRACLE', hint: 'Divine wonder' },
      { word: 'HEALING', hint: 'Being restored' },
      { word: 'BLESSED', hint: 'Favored by God' },
      { word: 'GRACE', hint: 'God\'s favor' },
      { word: 'MERCY', hint: 'God\'s compassion' },
      { word: 'PEACE', hint: 'Calm and rest' },
      { word: 'HOPE', hint: 'Confident expectation' },
    ]
  },
  hard: {
    name: 'Hard (15x15)',
    size: 15,
    words: [
      { word: 'SALVATION', hint: 'Being saved' },
      { word: 'RIGHTEOUS', hint: 'Living right' },
      { word: 'DISCIPLE', hint: 'Follower of Jesus' },
      { word: 'TESTIMONY', hint: 'Your faith story' },
      { word: 'WORSHIP', hint: 'Praise to God' },
      { word: 'STRENGTH', hint: 'God\'s power in us' },
      { word: 'VICTORY', hint: 'Winning in Christ' },
      { word: 'ETERNAL', hint: 'Forever' },
    ]
  }
};

type Difficulty = keyof typeof difficulties;

export function WordSearchGame({ onBack }: WordSearchGameProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const selectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentDifficulty = difficulties[difficulty];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    generateGrid();
  }, [difficulty]);

  useEffect(() => {
    if (foundWords.length === currentDifficulty.words.length && foundWords.length > 0) {
      setGameComplete(true);
    }
  }, [foundWords, currentDifficulty.words.length]);

  const generateGrid = () => {
    const size = currentDifficulty.size;
    const newGrid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
    const words = currentDifficulty.words;

    // Place words in grid
    words.forEach(({ word }) => {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 100) {
        const direction = Math.floor(Math.random() * 4); // 0: horizontal, 1: vertical, 2: diagonal-right, 3: diagonal-left
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        
        if (canPlaceWord(newGrid, word, row, col, direction, size)) {
          placeWord(newGrid, word, row, col, direction);
          placed = true;
        }
        attempts++;
      }
    });

    // Fill empty cells with random letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (newGrid[i][j] === '') {
          newGrid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    setGrid(newGrid);
    setFoundWords([]);
    setSelectedCells([]);
    setGameComplete(false);
    clearSelectionTimeout();
  };

  const canPlaceWord = (grid: string[][], word: string, row: number, col: number, direction: number, size: number): boolean => {
    const len = word.length;
    
    switch (direction) {
      case 0: // horizontal
        if (col + len > size) return false;
        for (let i = 0; i < len; i++) {
          if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) return false;
        }
        return true;
      case 1: // vertical
        if (row + len > size) return false;
        for (let i = 0; i < len; i++) {
          if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) return false;
        }
        return true;
      case 2: // diagonal-right
        if (row + len > size || col + len > size) return false;
        for (let i = 0; i < len; i++) {
          if (grid[row + i][col + i] !== '' && grid[row + i][col + i] !== word[i]) return false;
        }
        return true;
      case 3: // diagonal-left
        if (row + len > size || col - len < -1) return false;
        for (let i = 0; i < len; i++) {
          if (grid[row + i][col - i] !== '' && grid[row + i][col - i] !== word[i]) return false;
        }
        return true;
      default:
        return false;
    }
  };

  const placeWord = (grid: string[][], word: string, row: number, col: number, direction: number) => {
    const len = word.length;
    
    switch (direction) {
      case 0: // horizontal
        for (let i = 0; i < len; i++) {
          grid[row][col + i] = word[i];
        }
        break;
      case 1: // vertical
        for (let i = 0; i < len; i++) {
          grid[row + i][col] = word[i];
        }
        break;
      case 2: // diagonal-right
        for (let i = 0; i < len; i++) {
          grid[row + i][col + i] = word[i];
        }
        break;
      case 3: // diagonal-left
        for (let i = 0; i < len; i++) {
          grid[row + i][col - i] = word[i];
        }
        break;
    }
  };

  // Clear the selection timeout
  const clearSelectionTimeout = () => {
    if (selectionTimeoutRef.current) {
      clearTimeout(selectionTimeoutRef.current);
      selectionTimeoutRef.current = null;
    }
  };

  // Start a 3-second timeout to clear selection
  const startSelectionTimeout = () => {
    clearSelectionTimeout();
    selectionTimeoutRef.current = setTimeout(() => {
      setSelectedCells([]);
    }, 3000);
  };

  // Check if a cell is adjacent to the last selected cell in a valid direction
  const isValidNextCell = (cells: { row: number; col: number }[], newRow: number, newCol: number): boolean => {
    if (cells.length === 0) return true;
    if (cells.length === 1) {
      const first = cells[0];
      // Must be adjacent (including diagonal)
      const rowDiff = Math.abs(newRow - first.row);
      const colDiff = Math.abs(newCol - first.col);
      return rowDiff <= 1 && colDiff <= 1 && (rowDiff > 0 || colDiff > 0);
    }

    // For 2+ cells, check if the new cell continues in the same direction
    const last = cells[cells.length - 1];
    const secondLast = cells[cells.length - 2];
    
    const prevRowDir = last.row - secondLast.row;
    const prevColDir = last.col - secondLast.col;
    
    const newRowDir = newRow - last.row;
    const newColDir = newCol - last.col;
    
    // Must continue in the same direction
    return prevRowDir === newRowDir && prevColDir === newColDir;
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    setSelectedCells(prev => {
      // If clicking the same cell that's already selected, check the word
      const isAlreadySelected = prev.some(cell => cell.row === row && cell.col === col);
      if (isAlreadySelected) {
        checkWordAndClear(prev);
        return [];
      }

      // Check if this is a valid next cell
      if (!isValidNextCell(prev, row, col)) {
        // Invalid selection - start fresh
        startSelectionTimeout();
        return [{ row, col }];
      }

      // Add the cell to selection
      const newSelection = [...prev, { row, col }];
      
      // Check if we've formed a word
      const selectedWord = newSelection.map(({ row, col }) => grid[row][col]).join('');
      const reversedWord = selectedWord.split('').reverse().join('');
      
      const matchedWord = currentDifficulty.words.find(
        ({ word }) => word === selectedWord || word === reversedWord
      );

      if (matchedWord && !foundWords.find(fw => fw.word === matchedWord.word)) {
        // Found a word! Clear timeout and add it
        clearSelectionTimeout();
        setFoundWords(fws => [...fws, { word: matchedWord.word, cells: [...newSelection] }]);
        return [];
      }

      // Continue selection and reset timeout
      startSelectionTimeout();
      return newSelection;
    });
  };

  // Check word and clear (used when clicking an already selected cell)
  const checkWordAndClear = (cells: { row: number; col: number }[]) => {
    if (cells.length < 2) return;

    const selectedWord = cells.map(({ row, col }) => grid[row][col]).join('');
    const reversedWord = selectedWord.split('').reverse().join('');

    const matchedWord = currentDifficulty.words.find(
      ({ word }) => word === selectedWord || word === reversedWord
    );

    if (matchedWord && !foundWords.find(fw => fw.word === matchedWord.word)) {
      setFoundWords(prev => [...prev, { word: matchedWord.word, cells: [...cells] }]);
    }
    
    clearSelectionTimeout();
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearSelectionTimeout();
    };
  }, []);

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  };

  const isCellFound = (row: number, col: number) => {
    return foundWords.some(fw => fw.cells.some(cell => cell.row === row && cell.col === col));
  };

  const getCellColor = (row: number, col: number) => {
    if (isCellFound(row, col)) return 'bg-green-400 text-white';
    if (isCellSelected(row, col)) return 'bg-blue-300 text-white';
    return 'bg-white hover:bg-blue-100';
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
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] text-[24px] sm:text-[32px] text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2 font-bold">
            Word Search 🔍
          </h1>
          <div className="hidden sm:block w-32" /> {/* Spacer */}
        </div>

        {/* Game Complete Modal */}
        {gameComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl">
              <div className="text-5xl sm:text-6xl mb-4">🎉</div>
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA] text-[24px] sm:text-[28px] mb-4">
                Amazing Work!
              </h2>
              <p className="text-gray-600 mb-6">
                You found all {currentDifficulty.words.length} words!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={generateGrid}
                  className="bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] text-white rounded-full px-6 py-4 sm:py-6"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Play Again
                </Button>
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="rounded-full px-6 py-4 sm:py-6 border-2 border-[#FF6B9D] text-[#FF6B9D]"
                >
                  Back to Games
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Game Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl">
              {/* Difficulty Selector */}
              <div className="flex gap-2 mb-4 sm:mb-6 flex-wrap justify-center lg:justify-start">
                {(Object.keys(difficulties) as Difficulty[]).map((diff) => (
                  <Button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`rounded-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base ${
                      difficulty === diff
                        ? 'bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {difficulties[diff].name}
                  </Button>
                ))}
                <Button
                  onClick={generateGrid}
                  className="rounded-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white w-full sm:w-auto sm:ml-auto"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  New Puzzle
                </Button>
              </div>

              {/* Grid */}
              <div className="overflow-x-auto">
                <div className="flex justify-center min-w-min">
                  <div className="bg-gradient-to-br from-[#4ECDC4]/10 to-[#A78BFA]/10 p-2 sm:p-4 rounded-2xl">
                    {grid.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex">
                        {row.map((letter, colIndex) => (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center border border-gray-300 cursor-pointer select-none transition-all ${getCellColor(rowIndex, colIndex)}`}
                            style={{ userSelect: 'none' }}
                          >
                            <span className="text-xs sm:text-sm md:text-base font-semibold">{letter}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center text-xs sm:text-sm text-gray-600 px-2">
                Click/tap letters to select words • 3 second timeout • Find them horizontally, vertically, or diagonally
              </div>
            </div>
          </div>

          {/* Word List Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl lg:sticky lg:top-8">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ECDC4]" />
                <h3 className="text-[#4ECDC4] text-[18px] sm:text-[20px]">Find These Words</h3>
              </div>
              
              <div className="space-y-2 sm:space-y-3 max-h-[400px] lg:max-h-none overflow-y-auto">
                {currentDifficulty.words.map(({ word, hint }) => {
                  const isFound = foundWords.some(fw => fw.word === word);
                  return (
                    <motion.div
                      key={word}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-xl transition-all ${
                        isFound 
                          ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' 
                          : 'bg-gradient-to-r from-[#4ECDC4]/10 to-[#A78BFA]/10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold text-sm sm:text-base ${isFound ? 'line-through' : ''}`}>
                            {word}
                          </div>
                          <div className={`text-xs sm:text-sm ${isFound ? 'text-white/80' : 'text-gray-600'}`}>
                            {hint}
                          </div>
                        </div>
                        {isFound && (
                          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-[#FFE66D]/20 to-[#FF6B9D]/20 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-gray-700">Progress</span>
                  <span className="text-[#FF6B9D] font-semibold text-sm sm:text-base">
                    {foundWords.length} / {currentDifficulty.words.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(foundWords.length / currentDifficulty.words.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
