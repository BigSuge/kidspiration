import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Grid3x3, Lightbulb, RotateCcw, Trophy, Sparkles, Settings, X } from 'lucide-react';
import { Button } from '../ui/button';
import { generateCrossword, GeneratedWord } from '../../utils/crosswordGenerator';

interface CrosswordGameProps {
  onBack?: () => void;
}

type Word = GeneratedWord;

const BOARD_SIZE = 15;

type CellPointer = {
  row: number;
  col: number;
  direction: 'across' | 'down';
};

type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'master';

const DIFFICULTY_CONFIG = {
  easy: { name: 'Easy', hints: 4, description: 'Perfect for beginners! Simple words.' },
  medium: { name: 'Medium', hints: 3, description: 'A balanced challenge with more words' },
  hard: { name: 'Hard', hints: 2, description: 'Test your knowledge with harder words' },
  expert: { name: 'Expert', hints: 1, description: 'For true disciples! Very challenging.' },
  master: { name: 'Master', hints: 0, description: 'No hints at all! Maximum difficulty.' }
};

export function CrosswordGame({ onBack }: CrosswordGameProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [words, setWords] = useState<Word[]>([]);
  const [grid, setGrid] = useState<string[][]>([]);
  const [userGrid, setUserGrid] = useState<string[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [hints, setHints] = useState<number>(DIFFICULTY_CONFIG.medium.hints);
  const [maxHints, setMaxHints] = useState<number>(DIFFICULTY_CONFIG.medium.hints);
  const [isComplete, setIsComplete] = useState(false);
  const [activeWord, setActiveWord] = useState<Word | null>(null);
  const [showDifficultySelector, setShowDifficultySelector] = useState(true);
  const cellRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const wordKey = (word: Word) => `${word.number}-${word.direction}`;
  const cellKey = (row: number, col: number) => `${row}-${col}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!showDifficultySelector) {
      initializeGrid();
    }
  }, [difficulty, showDifficultySelector]);

  useEffect(() => {
    if (userGrid.length > 0) {
      checkCompletion();
    }
  }, [userGrid]);

  const initializeGrid = () => {
    // Generate new puzzle
    const puzzle = generateCrossword(difficulty);
    setWords(puzzle.words);

    const newGrid: string[][] = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(''));
    const newUserGrid: string[][] = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(''));

    puzzle.words.forEach((word) => {
      for (let i = 0; i < word.word.length; i++) {
        if (word.direction === 'across') {
          newGrid[word.startRow][word.startCol + i] = word.word[i];
        } else {
          newGrid[word.startRow + i][word.startCol] = word.word[i];
        }
      }
    });

    cellRefs.current = {};
    setGrid(newGrid);
    setUserGrid(newUserGrid);
    const hintsForDifficulty = DIFFICULTY_CONFIG[difficulty].hints;
    setHints(hintsForDifficulty);
    setMaxHints(hintsForDifficulty);
    setIsComplete(false);
    setSelectedCell(null);
    setActiveWord(null);
  };

  const getWordCells = (word: Word) => {
    const cells: { row: number; col: number }[] = [];
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

  const getOverlappingWords = (row: number, col: number) => {
    return words.filter((word) => cellBelongsToWord(word, row, col));
  };

  const getCellNumber = (row: number, col: number): number | null => {
    const word = words.find((w) => w.startRow === row && w.startCol === col);
    return word ? word.number : null;
  };

  const getNextCellInWord = (word: Word | null, row: number, col: number): CellPointer | null => {
    if (!word) return null;
    const cells = getWordCells(word);
    const currentIndex = cells.findIndex((cell) => cell.row === row && cell.col === col);
    if (currentIndex === -1) return null;
    const nextIndex = currentIndex + 1;
    if (nextIndex < cells.length) {
      const nextCell = cells[nextIndex];
      return { row: nextCell.row, col: nextCell.col, direction: word.direction };
    }
    return null;
  };

  const getPreviousCellInWord = (word: Word | null, row: number, col: number): CellPointer | null => {
    if (!word) return null;
    const cells = getWordCells(word);
    const currentIndex = cells.findIndex((cell) => cell.row === row && cell.col === col);
    if (currentIndex <= 0) return null;
    const previousCell = cells[currentIndex - 1];
    return { row: previousCell.row, col: previousCell.col, direction: word.direction };
  };

  const selectCell = (
    row: number,
    col: number,
    options?: { preferredDirection?: 'across' | 'down'; forcedWord?: Word }
  ) => {
    if (!grid[row] || grid[row][col] === '') return;

    const overlapping = getOverlappingWords(row, col);
    const preferredDirection = options?.preferredDirection;
    const forcedWord = options?.forcedWord;

    let nextWord: Word | null =
      forcedWord ||
      (preferredDirection && overlapping.find((word) => word.direction === preferredDirection)) ||
      (activeWord && overlapping.find((word) => word.direction === activeWord.direction)) ||
      overlapping.find((word) => word.direction === 'across') ||
      overlapping[0] ||
      null;

    setSelectedCell({ row, col });
    setActiveWord(nextWord);
  };

  const findNextAvailableCell = (row: number, col: number): CellPointer | null => {
    if (!grid[row]) return null;
    if (col + 1 < grid[row].length && grid[row][col + 1] !== '') {
      return { row, col: col + 1, direction: 'across' };
    }
    if (row + 1 < grid.length && grid[row + 1][col] !== '') {
      return { row: row + 1, col, direction: 'down' };
    }
    return null;
  };

  const findPreviousAvailableCell = (row: number, col: number): CellPointer | null => {
    if (!grid[row]) return null;
    if (col - 1 >= 0 && grid[row][col - 1] !== '') {
      return { row, col: col - 1, direction: 'across' };
    }
    if (row - 1 >= 0 && grid[row - 1][col] !== '') {
      return { row: row - 1, col, direction: 'down' };
    }
    return null;
  };

  const moveToNextCell = (row: number, col: number, referenceWord?: Word | null) => {
    const wordToUse = referenceWord ?? activeWord;
    const nextInWord = getNextCellInWord(wordToUse ?? null, row, col);
    if (nextInWord) {
      const options = wordToUse
        ? { preferredDirection: wordToUse.direction, forcedWord: wordToUse }
        : { preferredDirection: nextInWord.direction };
      selectCell(nextInWord.row, nextInWord.col, options);
      return nextInWord;
    }

    const fallback = findNextAvailableCell(row, col);
    if (fallback) {
      selectCell(fallback.row, fallback.col, { preferredDirection: fallback.direction });
    }
    return fallback;
  };

  const moveToPreviousCell = (row: number, col: number, referenceWord?: Word | null) => {
    const wordToUse = referenceWord ?? activeWord;
    const prevInWord = getPreviousCellInWord(wordToUse ?? null, row, col);
    if (prevInWord) {
      const options = wordToUse
        ? { preferredDirection: wordToUse.direction, forcedWord: wordToUse }
        : { preferredDirection: prevInWord.direction };
      selectCell(prevInWord.row, prevInWord.col, options);
      return prevInWord;
    }

    const fallback = findPreviousAvailableCell(row, col);
    if (fallback) {
      selectCell(fallback.row, fallback.col, { preferredDirection: fallback.direction });
    }
    return fallback;
  };

  const checkCompletion = () => {
    if (!grid.length) return;

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

    const allFilled = grid.every((rowArr, r) =>
      rowArr.every((cell, c) => cell === '' || userGrid[r][c] !== '')
    );

    if (allFilled && allCorrect) {
      setIsComplete(true);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col] === '') return;
    selectCell(row, col);
  };

  const handleCellInputChange = (row: number, col: number, value: string) => {
    const sanitized = value.replace(/[^a-zA-Z]/g, '').slice(-1).toUpperCase();
    setUserGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = sanitized;
      return next;
    });

    if (sanitized) {
      moveToNextCell(row, col, activeWord);
    }
  };

  const handleCellKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    if (event.key === 'Tab') return;

    if (event.key === 'Backspace') {
      event.preventDefault();
      if (userGrid[row][col]) {
        setUserGrid((prev) => {
          const next = prev.map((r) => [...r]);
          next[row][col] = '';
          return next;
        });
      } else {
        const previous = moveToPreviousCell(row, col, activeWord);
        if (previous) {
          setUserGrid((prev) => {
            const next = prev.map((r) => [...r]);
            next[previous.row][previous.col] = '';
            return next;
          });
        }
      }
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveToNextCell(row, col, activeWord);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveToPreviousCell(row, col);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (row + 1 < grid.length && grid[row + 1][col] !== '') {
        selectCell(row + 1, col, { preferredDirection: 'down' });
      }
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (row - 1 >= 0 && grid[row - 1][col] !== '') {
        selectCell(row - 1, col, { preferredDirection: 'down' });
      }
      return;
    }

    if (/^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
      handleCellInputChange(row, col, event.key);
    }
  };

  const useHint = () => {
    if (hints <= 0 || !selectedCell) return;

    const { row, col } = selectedCell;
    const correctLetter = grid[row][col];
    if (correctLetter) {
      setUserGrid((prev) => {
        const next = prev.map((r) => [...r]);
        next[row][col] = correctLetter;
        return next;
      });
      setHints((prev) => prev - 1);
      moveToNextCell(row, col);
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

    let classes = 'bg-white border-2 cursor-text hover:bg-blue-50 ';
    if (isSelected) classes += 'border-blue-500 ring-2 ring-blue-300 ';
    else if (isCorrect) classes += 'border-green-400 bg-green-50 ';
    else if (isWrong) classes += 'border-red-400 bg-red-50 ';
    else classes += 'border-gray-300 ';

    if (activeWord && cellBelongsToWord(activeWord, row, col)) {
      classes += ' bg-yellow-50 ';
    }

    return classes;
  };

  const wordStates = useMemo(() => {
    const states: Record<string, { filled: boolean; correct: boolean }> = {};
    words.forEach((word) => {
      const cells = getWordCells(word);
      let filled = true;
      let correct = true;
      cells.forEach((cell, index) => {
        const value = userGrid[cell.row]?.[cell.col] || '';
        if (!value) filled = false;
        if (value !== word.word[index]) {
          correct = false;
        }
      });
      states[wordKey(word)] = { filled, correct };
    });
    return states;
  }, [userGrid, words]);

  const overlappingWordsForSelection = useMemo(() => {
    if (!selectedCell) return [] as Word[];
    return words.filter((word) => cellBelongsToWord(word, selectedCell.row, selectedCell.col));
  }, [selectedCell]);

  useEffect(() => {
    if (!selectedCell) return;
    const key = cellKey(selectedCell.row, selectedCell.col);
    const node = cellRefs.current[key];
    node?.focus();
    node?.select();
  }, [selectedCell]);

  const focusWord = (word: Word, moveToStart = true) => {
    if (moveToStart) {
      selectCell(word.startRow, word.startCol, {
        preferredDirection: word.direction,
        forcedWord: word,
      });
    } else if (selectedCell) {
      selectCell(selectedCell.row, selectedCell.col, {
        forcedWord: word,
        preferredDirection: word.direction,
      });
    } else {
      setActiveWord(word);
    }
  };

  const startGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    const hintsForDifficulty = DIFFICULTY_CONFIG[selectedDifficulty].hints;
    setHints(hintsForDifficulty);
    setMaxHints(hintsForDifficulty);
    setShowDifficultySelector(false);
  };

  return (
    <div className="pt-20 min-h-screen pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* Difficulty Selector Modal */}
        <AnimatePresence>
          {showDifficultySelector && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={(e) => {
                // Only close if clicking the backdrop, not the modal content
                if (e.target === e.currentTarget && !isComplete) {
                  setShowDifficultySelector(false);
                }
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-[95vw] sm:max-w-md w-full shadow-2xl relative mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button - only show if game has started */}
                {words.length > 0 && !isComplete && (
                  <button
                    onClick={() => setShowDifficultySelector(false)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                )}

                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#4ECDC4] to-[#06B6D4] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-3 sm:mb-4">
                    <Grid3x3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Choose Difficulty</h2>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base">Select your challenge level</p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => startGame(diff)}
                      className="w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 transition-all border-2 border-transparent hover:border-cyan-300"
                    >
                      <div className="flex items-center justify-between gap-2 sm:gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800 text-xs sm:text-sm md:text-base">{DIFFICULTY_CONFIG[diff].name}</p>
                          <p className="text-xs sm:text-sm md:text-base text-gray-600 truncate">{DIFFICULTY_CONFIG[diff].description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-600">{DIFFICULTY_CONFIG[diff].hints}</p>
                          <p className="text-xs text-gray-500">hints</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {words.length === 0 && (
                  <Button
                    onClick={onBack}
                    variant="ghost"
                    className="w-full mt-4 hover:bg-gray-100"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Games
                  </Button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 sm:mb-8"
        >
          <Button onClick={onBack} variant="ghost" className="mb-4 hover:bg-cyan-100">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Games
          </Button>

          <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 mb-2">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#4ECDC4] to-[#06B6D4] rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Grid3x3 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] font-bold text-lg sm:text-2xl md:text-3xl truncate">
                  Crossword Puzzle
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 truncate">Bible Words Challenge · {DIFFICULTY_CONFIG[difficulty].name}</p>
              </div>
            </div>
            {words.length > 0 && (
              <Button
                onClick={() => setShowDifficultySelector(true)}
                className="bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 flex-shrink-0"
              >
                <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Change</span>
              </Button>
            )}
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
              <div className="flex gap-2 sm:gap-3">
                <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 shadow">
                  <p className="text-xs sm:text-sm text-gray-600 font-bold">Hints Left</p>
                  <p className="text-lg sm:text-xl md:text-2xl text-cyan-600 text-center">{hints}</p>
                </div>
              </div>
              <div className="flex gap-1.5 sm:gap-2">
                <Button
                  onClick={useHint}
                  disabled={hints <= 0 || !selectedCell}
                  className="bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-white rounded-full shadow-lg disabled:opacity-50 text-xs sm:text-sm md:text-base px-2.5 py-1.5 sm:px-3 sm:py-2"
                >
                  <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2" />
                  Hint
                </Button>
                <Button
                  onClick={initializeGrid}
                  className="bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white rounded-full shadow-lg p-1.5 sm:p-2 md:px-4 md:py-2"
                  aria-label="New Puzzle"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto -mx-4 sm:-mx-2 md:mx-0 px-4 sm:px-2 md:px-0">
              <div className="inline-block bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-1.5 sm:p-2 md:p-3 lg:p-4 shadow-lg min-w-min">
                <div className="grid gap-[2px] sm:gap-0.5 md:gap-1" style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(24px, 40px))` }}>
                  {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                      const key = `${rowIndex}-${colIndex}`;

                      if (cell === '') {
                        return (
                          <div
                            key={key}
                            className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-gray-800 rounded-[4px] sm:rounded-[6px]"
                          />
                        );
                      }

                      const cellNumber = getCellNumber(rowIndex, colIndex);
                      
                      return (
                        <div
                          key={key}
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                          className={`w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center transition-all rounded-[4px] sm:rounded-[6px] relative ${getCellClass(rowIndex, colIndex)}`}
                        >
                          {cellNumber && (
                            <span className="absolute top-0 left-0.5 text-[5px] sm:text-[6px] md:text-[7px] font-normal text-gray-500 leading-none pointer-events-none z-10">
                              {cellNumber}
                            </span>
                          )}
                          <input
                            ref={(el) => {
                              if (el) {
                                cellRefs.current[cellKey(rowIndex, colIndex)] = el;
                              } else {
                                delete cellRefs.current[cellKey(rowIndex, colIndex)];
                              }
                            }}
                            value={userGrid[rowIndex]?.[colIndex] || ''}
                            spellCheck={false}
                            maxLength={1}
                            autoComplete="off"
                            autoCorrect="off"
                            inputMode="text"
                            className="w-full h-full text-center text-xs sm:text-sm md:text-base lg:text-lg uppercase bg-transparent focus:outline-none"
                            onChange={(event) => handleCellInputChange(rowIndex, colIndex, event.target.value)}
                            onKeyDown={(event) => handleCellKeyDown(event, rowIndex, colIndex)}
                            onFocus={() => selectCell(rowIndex, colIndex)}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {selectedCell && activeWord && (
              <div className="mt-3 sm:mt-4 md:mt-6 bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 shadow-lg">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 items-start sm:items-center">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500 uppercase">Active Word</p>
                    <p className="text-base sm:text-lg md:text-xl text-gray-900 font-semibold">
                      #{activeWord.number} · {activeWord.direction.toUpperCase()}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">{activeWord.clue}</p>
                  </div>
                  {overlappingWordsForSelection.length > 1 && (
                    <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                      {overlappingWordsForSelection.map((word) => (
                        <button
                          key={wordKey(word)}
                          onClick={() => focusWord(word, false)}
                          className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold border ${
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
                    {words
                      .filter((word) => word.direction === 'across')
                      .map((word) => {
                        const state = wordStates[wordKey(word)];
                        const isActive = activeWord && wordKey(activeWord) === wordKey(word);
                        const isCorrect = state?.correct;
                        const isFilled = state?.filled && !state?.correct;

                        let extraClasses = 'bg-gradient-to-r from-cyan-50 to-blue-50 border border-transparent';
                        if (isCorrect) {
                          extraClasses = 'bg-green-50 border-green-200 ring-2 ring-green-300 text-green-800';
                        } else if (isActive) {
                          extraClasses += ' ring-2 ring-cyan-300';
                        } else if (isFilled) {
                          extraClasses += ' ring-2 ring-amber-200';
                        }

                        return (
                          <button
                            key={word.number}
                            onClick={() => focusWord(word)}
                            className={`w-full text-left rounded-lg sm:rounded-xl p-2 sm:p-3 transition-all flex items-start justify-between gap-3 ${extraClasses}`}
                          >
                            <div>
                              <p className="text-xs text-gray-600 font-bold">#{word.number}</p>
                              <p className="text-xs sm:text-sm text-gray-800">{word.clue}</p>
                            </div>
                            {isCorrect && <span className="text-xs sm:text-sm font-semibold text-green-600">Done</span>}
                          </button>
                        );
                      })}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm text-purple-600 mb-2">Down</h4>
                  <div className="space-y-2">
                    {words
                      .filter((word) => word.direction === 'down')
                      .map((word) => {
                        const state = wordStates[wordKey(word)];
                        const isActive = activeWord && wordKey(activeWord) === wordKey(word);
                        const isCorrect = state?.correct;
                        const isFilled = state?.filled && !state?.correct;

                        let extraClasses = 'bg-gradient-to-r from-purple-50 to-pink-50 border border-transparent';
                        if (isCorrect) {
                          extraClasses = 'bg-green-50 border-green-200 ring-2 ring-green-300 text-green-800';
                        } else if (isActive) {
                          extraClasses += ' ring-2 ring-purple-200';
                        } else if (isFilled) {
                          extraClasses += ' ring-2 ring-amber-200';
                        }

                        return (
                          <button
                            key={word.number}
                            onClick={() => focusWord(word)}
                            className={`w-full text-left rounded-lg sm:rounded-xl p-2 sm:p-3 transition-all flex items-start justify-between gap-3 ${extraClasses}`}
                          >
                            <div>
                              <p className="text-xs text-gray-600 font-bold">#{word.number}</p>
                              <p className="text-xs sm:text-sm text-gray-800">{word.clue}</p>
                            </div>
                            {isCorrect && <span className="text-xs sm:text-sm font-semibold text-green-600">Done</span>}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center">
              <h3 className="text-gray-800 mb-2 font-bold">How to Play 🎮</h3>
              <p className="text-xs sm:text-sm text-gray-700">
                Tap a clue or cell, then type directly in the highlighted boxes. Each letter auto-advances to the next square (rightwards first, then down) so you can stay in the flow. Finish every word to win!
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
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                    y: -20,
                    rotate: Math.random() * 360,
                    opacity: 1,
                  }}
                  animate={{
                    y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                    rotate: Math.random() * 720,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    ease: 'easeIn',
                    delay: Math.random() * 0.3,
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
                transition={{ type: 'spring', duration: 0.6 }}
                className="bg-gradient-to-br from-[#4ECDC4] via-[#A78BFA] to-[#FF6B9D] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 max-w-[95vw] sm:max-w-md w-full shadow-2xl text-center relative mx-4"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-5 sm:-top-6 md:-top-8 left-1/2 transform -translate-x-1/2"
                >
                  <Trophy className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-yellow-400" />
                </motion.div>

                <div className="mt-5 sm:mt-6 md:mt-8">
                  <h2 className="text-white mb-2 sm:mb-3 md:mb-4 text-xl sm:text-2xl md:text-3xl">🎉 Amazing! 🎉</h2>
                  <p className="text-white/90 text-base sm:text-lg md:text-xl mb-3 sm:mb-4">You completed the crossword!</p>
                  <div className="bg-white/20 backdrop-blur rounded-lg sm:rounded-xl md:rounded-2xl p-2.5 sm:p-3 md:p-4 mb-3 sm:mb-4 md:mb-6 space-y-1.5 sm:space-y-2">
                    <p className="text-white text-xs sm:text-sm md:text-base">
                      Difficulty: <span className="text-lg sm:text-xl md:text-2xl font-bold">{DIFFICULTY_CONFIG[difficulty].name}</span>
                    </p>
                    <p className="text-white text-xs sm:text-sm md:text-base">
                      Hints Used: <span className="text-lg sm:text-xl md:text-2xl">{maxHints - hints}</span> / {maxHints}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setShowDifficultySelector(true);
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
