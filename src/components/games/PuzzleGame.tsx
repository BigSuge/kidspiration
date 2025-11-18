import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Puzzle, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface PuzzleGameProps {
  onBack?: () => void;
}

interface PuzzlePiece {
  id: number;
  currentPosition: number;
  correctPosition: number;
  image: string;
}

const puzzleImages = [
  'https://images.unsplash.com/photo-1640297528708-795200bbc64f?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1751879182448-d7b3dce2b00e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1577086664341-033ee09074ec?w=600&h=600&fit=crop',
];

export function PuzzleGame({ onBack }: PuzzleGameProps) {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const gridSize = 3; // 3x3 puzzle

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    initializePuzzle();
  }, []);

  useEffect(() => {
    if (pieces.length > 0) {
      checkCompletion();
    }
  }, [pieces]);

  const initializePuzzle = () => {
    // Randomly select a puzzle image
    const randomIndex = Math.floor(Math.random() * puzzleImages.length);
    setCurrentPuzzleIndex(randomIndex);
    
    const newPieces: PuzzlePiece[] = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      newPieces.push({
        id: i,
        currentPosition: i,
        correctPosition: i,
        image: puzzleImages[randomIndex]
      });
    }

    // Shuffle pieces
    const shuffled = [...newPieces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tempPos = shuffled[i].currentPosition;
      shuffled[i].currentPosition = shuffled[j].currentPosition;
      shuffled[j].currentPosition = tempPos;
    }

    // Sort by current position for display
    shuffled.sort((a, b) => a.currentPosition - b.currentPosition);
    setPieces(shuffled);
    setMoves(0);
    setIsComplete(false);
  };

  const checkCompletion = () => {
    const complete = pieces.every(piece => piece.currentPosition === piece.correctPosition);
    setIsComplete(complete);
  };

  const handlePieceClick = (pieceId: number) => {
    if (isComplete) return;

    if (selectedPiece === null) {
      setSelectedPiece(pieceId);
    } else if (selectedPiece === pieceId) {
      setSelectedPiece(null);
    } else {
      // Swap pieces
      const newPieces = [...pieces];
      const piece1Index = newPieces.findIndex(p => p.id === selectedPiece);
      const piece2Index = newPieces.findIndex(p => p.id === pieceId);

      const tempPos = newPieces[piece1Index].currentPosition;
      newPieces[piece1Index].currentPosition = newPieces[piece2Index].currentPosition;
      newPieces[piece2Index].currentPosition = tempPos;

      newPieces.sort((a, b) => a.currentPosition - b.currentPosition);
      setPieces(newPieces);
      setSelectedPiece(null);
      setMoves(moves + 1);
    }
  };

  const getPieceStyle = (pieceId: number) => {
    // Calculate which segment of the image this piece represents
    const row = Math.floor(pieceId / gridSize);
    const col = pieceId % gridSize;
    
    return {
      backgroundImage: `url(${puzzleImages[currentPuzzleIndex]})`,
      backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
      backgroundPosition: `${col * 50}% ${row * 50}%`
    };
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
            className="mb-4 hover:bg-purple-100"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Games
          </Button>

          <div className="flex items-center gap-3 sm:gap-4 mb-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <Puzzle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-[32px] font-bold">
                Puzzle Game
              </h1>
              <p className="text-sm sm:text-base text-gray-600">Arrange the pieces to complete the picture!</p>
            </div>
          </div>
        </motion.div>

        {/* Game Stats */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
            <p className="text-xs sm:text-sm text-gray-600 font-bold">Moves</p>
            <p className="text-xl sm:text-2xl text-purple-600 text-center">{moves}</p>
          </div>
          <Button
            onClick={initializePuzzle}
            className="bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            New Puzzle
          </Button>
        </motion.div>

        {/* Game Area: Reference Image + Puzzle Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Reference Image */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8"
          >
            <div className="mb-3 sm:mb-4">
              <h3 className="text-gray-800 text-center flex items-center justify-center gap-2 text-[20px] font-bold">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                Reference Image
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center mt-1">Look at this picture while solving</p>
            </div>
            <div className="relative aspect-square max-w-[320px] sm:max-w-sm mx-auto sm:rounded-2xl overflow-hidden shadow-lg border-4 border-purple-200 rounded-[0px]">
              <img
                src={puzzleImages[currentPuzzleIndex]}
                alt="Reference puzzle image"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Puzzle Grid */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8"
          >
            <div className="mb-3 sm:mb-4">
              <h3 className="text-gray-800 text-center flex items-center justify-center gap-2 font-bold">
                <Puzzle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                Solve the Puzzle
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center mt-1">Click two pieces to swap them</p>
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 max-w-[320px] sm:max-w-sm mx-auto bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-inner">
              {pieces.map((piece) => (
                <motion.button
                  key={piece.id}
                  onClick={() => handlePieceClick(piece.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square shadow-md relative overflow-hidden transition-all border-2 ${
                    selectedPiece === piece.id
                      ? 'ring-2 sm:ring-4 ring-purple-500 ring-offset-1 sm:ring-offset-2 border-purple-500'
                      : 'border-gray-200'
                  } ${
                    piece.currentPosition === piece.correctPosition && !isComplete
                      ? 'border-green-400'
                      : ''
                  }`}
                  style={getPieceStyle(piece.id)}
                >
                  {piece.currentPosition === piece.correctPosition && !isComplete && (
                    <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 z-10">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-100 to-cyan-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-gray-800 mb-2 font-bold">How to Play 🎮</h3>
          <p className="text-sm sm:text-base text-gray-700 text-[16px]">
            Look at the reference image on the left, then click two puzzle pieces to swap them. 
            Match all pieces to their correct positions to complete the puzzle! 
            A green checkmark shows when a piece is in the right place.
          </p>
        </motion.div>

        {/* Completion Modal */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setIsComplete(false)}
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
                    backgroundColor: ['#FF6B9D', '#A78BFA', '#4ECDC4', '#FFD700', '#FF69B4', '#00CED1'][Math.floor(Math.random() * 6)],
                    borderRadius: Math.random() > 0.5 ? '50%' : '0%'
                  }}
                />
              ))}

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="bg-gradient-to-br from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                >
                  <Trophy className="w-16 h-16 text-yellow-400" />
                </motion.div>

                <div className="mt-8">
                  <h2 className="text-white mb-4">🎉 Congratulations! 🎉</h2>
                  <p className="text-white/90 text-xl mb-4">
                    You completed the puzzle!
                  </p>
                  <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-6">
                    <p className="text-white">Total Moves: <span className="text-2xl">{moves}</span></p>
                  </div>
                  <Button
                    onClick={() => {
                      initializePuzzle();
                      setIsComplete(false);
                    }}
                    className="bg-white text-purple-600 rounded-full px-8 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
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
