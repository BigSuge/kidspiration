import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Brain, Trophy, Sparkles, Check, X } from 'lucide-react';
import { Button } from '../ui/button';

interface BibleQuizProps {
  onBack?: () => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  verse?: string;
}

export function BibleQuiz({ onBack }: BibleQuizProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const questions: Question[] = [
    {
      question: 'Who built the ark?',
      options: ['Moses', 'Noah', 'Abraham', 'David'],
      correctAnswer: 1,
      verse: 'Genesis 6:14'
    },
    {
      question: 'How many days did God take to create the world?',
      options: ['5 days', '6 days', '7 days', '8 days'],
      correctAnswer: 1,
      verse: 'Genesis 1:31'
    },
    {
      question: 'What did Jesus turn water into?',
      options: ['Juice', 'Wine', 'Milk', 'Oil'],
      correctAnswer: 1,
      verse: 'John 2:9'
    },
    {
      question: 'How many disciples did Jesus have?',
      options: ['10', '11', '12', '13'],
      correctAnswer: 2,
      verse: 'Matthew 10:1'
    },
    {
      question: 'Who was swallowed by a big fish?',
      options: ['Jonah', 'Peter', 'Paul', 'John'],
      correctAnswer: 0,
      verse: 'Jonah 1:17'
    },
    {
      question: 'What is the first book of the Bible?',
      options: ['Exodus', 'Leviticus', 'Genesis', 'Numbers'],
      correctAnswer: 2,
      verse: 'Genesis 1:1'
    },
    {
      question: 'Who defeated Goliath?',
      options: ['Saul', 'David', 'Solomon', 'Samuel'],
      correctAnswer: 1,
      verse: '1 Samuel 17:50'
    },
    {
      question: 'How many commandments did God give Moses?',
      options: ['5', '8', '10', '12'],
      correctAnswer: 2,
      verse: 'Exodus 20:1-17'
    },
    {
      question: 'What did Jesus say we should do to our enemies?',
      options: ['Ignore them', 'Love them', 'Avoid them', 'Fear them'],
      correctAnswer: 1,
      verse: 'Matthew 5:44'
    },
    {
      question: 'Where was Jesus born?',
      options: ['Jerusalem', 'Nazareth', 'Bethlehem', 'Egypt'],
      correctAnswer: 2,
      verse: 'Luke 2:4-7'
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === questions[currentQuestion].correctAnswer;
    setAnswers([...answers, isCorrect]);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setIsQuizComplete(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsQuizComplete(false);
    setAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! You're a Bible Expert! 🌟";
    if (percentage >= 80) return "Excellent! You know your Bible well! 🎉";
    if (percentage >= 60) return "Great job! Keep learning! 📖";
    if (percentage >= 40) return "Good effort! Keep studying! 💪";
    return "Keep learning about Jesus! You can do it! ❤️";
  };

  const getButtonClass = (index: number) => {
    if (selectedAnswer === null) {
      return 'bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-2 border-gray-200';
    }

    if (index === questions[currentQuestion].correctAnswer) {
      return 'bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-400';
    }

    if (index === selectedAnswer) {
      return 'bg-gradient-to-r from-red-100 to-red-200 border-2 border-red-400';
    }

    return 'bg-gray-100 border-2 border-gray-200';
  };

  if (isQuizComplete) {
    return (
      <div className="pt-20 min-h-screen pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="bg-gradient-to-br from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] rounded-3xl p-8 md:p-12 shadow-2xl text-center relative overflow-hidden"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-4 right-4"
            >
              <Sparkles className="w-12 h-12 text-yellow-300" />
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
              className="mb-6"
            >
              <Trophy className="w-24 h-24 mx-auto text-yellow-400" />
            </motion.div>

            <h2 className="text-white mb-4">Quiz Complete! 🎉</h2>
            <p className="text-2xl text-white mb-6">{getScoreMessage()}</p>

            <div className="bg-white/20 backdrop-blur rounded-3xl p-8 mb-8">
              <p className="text-white text-xl mb-2">Your Score</p>
              <p className="text-6xl text-white mb-4">{score}/{questions.length}</p>
              <div className="w-full bg-white/30 rounded-full h-4 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / questions.length) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-yellow-400 to-green-400 h-full rounded-full"
                />
              </div>
              <p className="text-white">{Math.round((score / questions.length) * 100)}% Correct</p>
            </div>

            <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-8">
              {answers.map((isCorrect, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-green-400' : 'bg-red-400'
                  }`}
                >
                  {isCorrect ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-white" />}
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                onClick={restartQuiz}
                className="bg-white text-purple-600 rounded-full px-8 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Try Again
              </Button>
              <Button
                onClick={onBack}
                className="bg-white/20 backdrop-blur text-white border-2 border-white rounded-full px-8 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Games
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 hover:bg-amber-100"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Games
          </Button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-[24px] font-bold">
                  Bible Quiz
                </h1>
                <p className="text-sm sm:text-base text-gray-600">Test your Bible knowledge!</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
              <p className="text-xs sm:text-sm text-gray-600 font-bold">Score</p>
              <p className="text-xl sm:text-2xl text-amber-600">{score}/{currentQuestion}</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="mb-8"
        >
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              className="bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] h-full rounded-full transition-all duration-500"
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 mb-8"
          >
            <h2 className="text-gray-800 mb-6 sm:mb-8 text-center text-[20px] font-bold">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                  className={`w-full p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl transition-all text-left text-base sm:text-lg ${getButtonClass(index)} disabled:cursor-not-allowed relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-800 flex-1">{option}</span>
                    {showResult && index === questions[currentQuestion].correctAnswer && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                      >
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </motion.div>
                    )}
                    {showResult && index === selectedAnswer && index !== questions[currentQuestion].correctAnswer && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {showResult && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-4 sm:mt-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center"
              >
                <p className="text-xs sm:text-sm text-gray-600">Bible Reference</p>
                <p className="text-sm sm:text-base text-purple-600">{questions[currentQuestion].verse}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Instructions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center"
        >
          <h3 className="text-gray-800 mb-2 font-bold">How to Play 🎮</h3>
          <p className="text-sm sm:text-base text-gray-700">
            Read each question carefully and choose the correct answer. 
            After each question, you'll see the Bible verse reference. Have fun learning!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
