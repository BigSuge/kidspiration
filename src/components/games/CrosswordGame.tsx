import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Grid3x3, Lightbulb, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface CrosswordGameProps {
  onBack?: () => void;
}

interface Word {
  word: string;
  clue: string;
  startRow: number;
  startCol: number;
  direction: 'across' | 'down';
  number: number;
}

export function CrosswordGame({ onBack }: CrosswordGameProps) {
  const words: Word[] = [
    { word: 'PETER', clue: 'Jesus called him "the rock"', startRow: 0, startCol: 0, direction: 'across', number: 1 },
    { word: 'JOHN', clue: 'The beloved disciple', startRow: 2, startCol: 0, direction: 'across', number: 2 },
    { word: 'JAMES', clue: 'Brother of John', startRow: 4, startCol: 0, direction: 'across', number: 3 },
    { word: 'ANDREW', clue: 'Peter\'s brother', startRow: 0, startCol: 0, direction: 'down', number: 4 },
    { word: 'MATTHEW', clue: 'He was a tax collector', startRow: 6, startCol: 1, direction: 'across', number: 5 },
  ];

  const [grid, setGrid] = useState<string[][]>([]);
  const [userGrid, setUserGrid] = useState<string[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [hints, setHints] = useState<number>(3);
  const [isComplete, setIsComplete] = useState(false);
  const [activeWord, setActiveWord] = useState<Word | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const wordKey = (word: Word) => `${word.number}-${word.direction}`;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    initializeGrid();
  }, []);

  useEffect(() => {
    if (userGrid.length > 0) {
      checkCompletion();
    }
  }, [userGrid]);

  const initializeGrid = () => {
    // Create 10x10 grid
    const size = 10;
    const newGrid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
    const newUserGrid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));

    // Place words in grid
    words.forEach(word => {
      for (let i = 0; i < word.word.length; i++) {
        if (word.direction === 'across') {
          newGrid[word.startRow][word.startCol + i] = word.word[i];
        } else {
          newGrid[word.startRow + i][word.startCol] = word.word[i];
        }
      }
    });

    setGrid(newGrid);
    setUserGrid(newUserGrid);
    setHints(3);
    setIsComplete(false);
    setSelectedCell(null);
    setActiveWord(null);
  };

  const getWordCells = (word: Word) => {
    const cells = [] as { row: number; col: number }[];
    for (let i = 0; i < word.word.length; i++) {
      if (word.direction === 'across') {
        cells.push({ row: word.startRow, col: word.startCol + i });
      } else {
        cells.push({ row: word.startRow + i, col: word.startCol });
      }
    }
    return cells;
  };

  const cellBelongsToWord = (word: Word, row: number, col: number) => {
    return getWordCells(word).some((cell) => cell.row === row && cell.col === col);
  };

  const checkCompletion = () => {
    let allCorrect = true;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] !== '' && userGrid[row][col] !== grid[row][col]) {
          allCorrect = false;
          break;
        }
      }
      if (!allCorrect) break;
    }

    // Check if all non-empty cells are filled
    const allFilled = grid.every((row, r) =>
      row.every((cell, c) => cell === '' || userGrid[r][c] !== '')
    );

    if (allFilled && allCorrect) {
      setIsComplete(true);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col] === '') return;

    const overlappingWords = words.filter((word) => cellBelongsToWord(word, row, col));
    const prioritizedWord = overlappingWords.find((word) => word.direction === activeWord?.direction) || overlappingWords[0] || null;

    setSelectedCell({ row, col });
    setActiveWord(prioritizedWord || null);
    inputRef.current?.focus();
  };

  const handleKeyPress = (key: string) => {
    if (!selectedCell) return;
    inputRef.current?.focus();

    const newUserGrid = [...userGrid.map(row => [...row])];
    const { row, col } = selectedCell;

    if (key === 'Backspace') {
      if (newUserGrid[row][col]) {
        newUserGrid[row][col] = '';
      } else {
        moveSelection(-1, true, newUserGrid);
      }
    } else if (key.length === 1 && /[A-Z]/.test(key.toUpperCase())) {
      newUserGrid[row][col] = key.toUpperCase();
      moveSelection(1, false, newUserGrid);
    }

    setUserGrid(newUserGrid);
  };

  const moveSelection = (step: 1 | -1, allowStay: boolean, newGrid?: string[][]) => {
    if (!activeWord || !selectedCell) return;
    const cells = getWordCells(activeWord);
    const currentIndex = cells.findIndex(cell => cell.row === selectedCell.row && cell.col === selectedCell.col);
    if (currentIndex === -1) return;
    const nextIndex = currentIndex + step;

    if (nextIndex < 0 || nextIndex >= cells.length) {
      if (!allowStay && nextIndex >= cells.length) {
        setSelectedCell(cells[cells.length - 1]);
      }
      return;
    }

    setSelectedCell(cells[nextIndex]);
    if (newGrid && step === -1) {
      const prevCell = cells[nextIndex];
      newGrid[prevCell.row][prevCell.col] = '';
    }
  };

  const useHint = () => {
    if (hints <= 0 || !selectedCell) return;

    const correctLetter = grid[selectedCell.row][selectedCell.col];
    if (correctLetter) {
      const newUserGrid = [...userGrid.map(row => [...row])];
      newUserGrid[selectedCell.row][selectedCell.col] = correctLetter;
      setUserGrid(newUserGrid);
      setHints(hints - 1);
    }
  };

  const getCellClass = (row: number, col: number) => {
    const isEmpty = grid[row][col] === '';
    const isSelected = selectedCell?.row === row && selectedCell?.col === col;
    const userLetter = userGrid[row][col];
    const correctLetter = grid[row][col];
    const isCorrect = userLetter && userLetter === correctLetter;
    const isWrong = userLetter && userLetter !== correctLetter;

    if (isEmpty) return 'bg-gray-800';
    
    let classes = 'bg-white border-2 cursor-pointer hover:bg-blue-50 ';
    if (isSelected) classes += 'border-blue-500 ring-2 ring-blue-300 ';
    else if (isCorrect) classes += 'border-green-400 bg-green-50 ';
    else if (isWrong) classes += 'border-red-400 bg-red-50 ';
    else classes += 'border-gray-300 ';

    if (activeWord && cellBelongsToWord(activeWord, row, col)) {
      classes += ' bg-yellow-50 ';
    }

    return classes;
  };

  const overlappingWordsForSelection = useMemo(() => {
    if (!selectedCell) return [] as Word[];
    return words.filter((word) => cellBelongsToWord(word, selectedCell.row, selectedCell.col));
  }, [selectedCell, words]);

  useEffect(() => {
    if (selectedCell) {
      inputRef.current?.focus();
    }
  }, [selectedCell]);

  const focusWord = (word: Word, moveToStart = true) => {
    setActiveWord(word);
    if (moveToStart) {
      setSelectedCell({ row: word.startRow, col: word.startCol });
    }
    inputRef.current?.focus();
  };

  return (
    <div className="pt-20 min-h-screen pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 sm:mb-8"
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 hover:bg-cyan-100"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Games
          </Button>

          <div className="flex items-center gap-3 sm:gap-4 mb-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#4ECDC4] to-[#06B6D4] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <Grid3x3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] font-bold">
                Crossword Puzzle
              </h1>
              <p className="text-sm sm:text-base text-gray-600">Find the 12 Disciples of Jesus!</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-6 sm:gap-8">
          {/* Crossword Grid */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
              <div className="flex gap-3">
                <div className="bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 shadow">
                  <p className="text-xs sm:text-sm text-gray-600 font-bold text-[12px]">Hints Left</p>
                  <p className="text-xl sm:text-2xl text-cyan-600 text-center">{hints}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={useHint}
                  disabled={hints <= 0 || !selectedCell}
                  className="bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-white rounded-full shadow-lg disabled:opacity-50 text-sm sm:text-base"
                >
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  Hint
                </Button>
                <Button
                  onClick={initializeGrid}
                  className="bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white rounded-full shadow-lg p-2 sm:px-4"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <div className="inline-block bg-white sm:rounded-2xl p-2 sm:p-3 md:p-4 shadow-lg min-w-min rounded-[14px]">
                <div className="grid gap-0.5 sm:gap-1" style={{ gridTemplateColumns: `repeat(10, minmax(28px, 40px))` }}>
                  {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        className={`w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center text-sm sm:text-base md:text-lg transition-all ${getCellClass(rowIndex, colIndex)}`}
                      >
                        {userGrid[rowIndex][colIndex]}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {selectedCell && activeWord && (
              <div className="mt-4 sm:mt-6 bg-white rounded-xl sm:rounded-2xl p-4 shadow-lg">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase">Active Word</p>
                    <p className="text-lg sm:text-xl text-gray-900 font-semibold">#{activeWord.number} · {activeWord.direction.toUpperCase()}</p>
                    <p className="text-sm text-gray-600">{activeWord.clue}</p>
                  </div>
                  {overlappingWordsForSelection.length > 1 && (
                    <div className="flex gap-2">
                      {overlappingWordsForSelection.map((word) => (
                        <button
                          key={wordKey(word)}
                          onClick={() => focusWord(word, false)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            activeWord && wordKey(word) === wordKey(activeWord)
                              ? 'bg-cyan-100 border-cyan-300 text-cyan-700'
                              : 'bg-gray-100 border-gray-200 text-gray-500'
                          }`}
                        >
                          #{word.number} {word.direction === 'across' ? 'Across' : 'Down'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedCell && (
              <div className="mt-4 sm:mt-6 flex justify-center">
                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg max-w-sm w-full">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 text-center">Type a letter</p>
                  <input
                    ref={inputRef}
                    className="sr-only"
                    aria-hidden="true"
                    value=""
                    onChange={() => {}}
                    onKeyDown={(event) => {
                      if (event.key === 'Tab') return;
                      event.preventDefault();
                      if (event.key === 'Backspace') {
                        handleKeyPress('Backspace');
                        return;
                      }
                      if (/^[a-zA-Z]$/.test(event.key)) {
                        handleKeyPress(event.key.toUpperCase());
                      }
                    }}
                  />
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
                    {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                      <button
                        key={letter}
                        onClick={() => handleKeyPress(letter)}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-md sm:rounded-lg hover:from-cyan-200 hover:to-blue-200 transition-colors text-xs sm:text-sm text-center flex items-center justify-center"
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handleKeyPress('Backspace')}
                    className="w-full mt-2 py-1.5 sm:py-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-md sm:rounded-lg hover:from-red-200 hover:to-pink-200 transition-colors text-xs sm:text-sm text-center"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Clues Panel */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6">
              <h3 className="text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
                Clues
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="text-xs sm:text-sm text-cyan-600 mb-2">Across</h4>
                  <div className="space-y-2">
                    {words.filter(w => w.direction === 'across').map(word => (
                      <button
                        key={word.number}
                        onClick={() => focusWord(word)}
                        className={`w-full text-left bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg sm:rounded-xl p-2 sm:p-3 transition-all ${
                          activeWord && wordKey(activeWord) === wordKey(word) ? 'ring-2 ring-cyan-300' : ''
                        }`}
                      >
                        <p className="text-xs text-gray-600 font-bold">#{word.number}</p>
                        <p className="text-xs sm:text-sm text-gray-800">{word.clue}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm text-purple-600 mb-2">Down</h4>
                  <div className="space-y-2">
                    {words.filter(w => w.direction === 'down').map(word => (
                      <button
                        key={word.number}
                        onClick={() => focusWord(word)}
                        className={`w-full text-left bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-2 sm:p-3 transition-all ${
                          activeWord && wordKey(activeWord) === wordKey(word) ? 'ring-2 ring-purple-200' : ''
                        }`}
                      >
                        <p className="text-xs text-gray-600 font-bold">#{word.number}</p>
                        <p className="text-xs sm:text-sm text-gray-800">{word.clue}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center">
              <h3 className="text-gray-800 mb-2 font-bold">How to Play 🎮</h3>
              <p className="text-xs sm:text-sm text-gray-700">
                Tap a clue or cell, then type or use the on-screen keyboard. Letters now auto-advance so touch players can keep their focus. Complete all highlighted words to win!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Completion Modal */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              {/* Confetti */}
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0, 
                    y: -20,
                    rotate: Math.random() * 360,
                    opacity: 1
                  }}
                  animate={{ 
                    y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                    rotate: Math.random() * 720,
                    opacity: 0
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2,
                    ease: "easeIn",
                    delay: Math.random() * 0.3
                  }}
                  className="absolute w-3 h-3 pointer-events-none"
                  style={{
                    backgroundColor: ['#4ECDC4', '#A78BFA', '#FF6B9D', '#FFD700', '#06B6D4', '#8B5CF6'][Math.floor(Math.random() * 6)],
                    borderRadius: Math.random() > 0.5 ? '50%' : '0%'
                  }}
                />
              ))}

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="bg-gradient-to-br from-[#4ECDC4] via-[#A78BFA] to-[#FF6B9D] rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2"
                >
                  <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
                </motion.div>

                <div className="mt-6 sm:mt-8">
                  <h2 className="text-white mb-3 sm:mb-4">🎉 Amazing! 🎉</h2>
                  <p className="text-white/90 text-lg sm:text-xl mb-3 sm:mb-4">
                    You completed the crossword!
                  </p>
                  <div className="bg-white/20 backdrop-blur rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
                    <p className="text-white text-sm sm:text-base">Hints Used: <span className="text-xl sm:text-2xl">{3 - hints}</span></p>
                  </div>
                  <Button
                    onClick={() => {
                      initializeGrid();
                      setIsComplete(false);
                    }}
                    className="bg-white text-cyan-600 rounded-full px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Play Again
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
