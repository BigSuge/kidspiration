// Word banks for different difficulty levels
export interface WordEntry {
  word: string;
  clue: string;
  testament: 'old' | 'new';
}

// Easy words (5-7 letters, very common)
export const EASY_WORDS: WordEntry[] = [
  // New Testament
  { word: 'JESUS', clue: 'The Son of God and our Savior', testament: 'new' },
  { word: 'PETER', clue: 'Walked on water toward Jesus', testament: 'new' },
  { word: 'JAMES', clue: 'Son of Zebedee, brother of John', testament: 'new' },
  { word: 'JOHN', clue: 'The disciple whom Jesus loved', testament: 'new' },
  { word: 'JUDAS', clue: 'Betrayed Jesus for silver', testament: 'new' },
  { word: 'PAUL', clue: 'Apostle to the Gentiles', testament: 'new' },
  { word: 'MARY', clue: 'Mother of Jesus', testament: 'new' },
  // Old Testament
  { word: 'MOSES', clue: 'Led Israelites out of Egypt', testament: 'old' },
  { word: 'DAVID', clue: 'Defeated Goliath with a sling', testament: 'old' },
  { word: 'NOAH', clue: 'Built an ark for the great flood', testament: 'old' },
  { word: 'ADAM', clue: 'First man created by God', testament: 'old' },
  { word: 'EVE', clue: 'First woman created by God', testament: 'old' },
  { word: 'AARON', clue: "Moses' brother and first high priest", testament: 'old' },
  { word: 'ISAAC', clue: "Abraham's promised son", testament: 'old' },
  { word: 'JACOB', clue: 'Father of the twelve tribes', testament: 'old' },
];

// Medium words (6-8 letters)
export const MEDIUM_WORDS: WordEntry[] = [
  // New Testament
  { word: 'MATTHEW', clue: 'Former tax collector disciple', testament: 'new' },
  { word: 'ANDREW', clue: "Peter's brother and disciple", testament: 'new' },
  { word: 'PHILIP', clue: 'Disciple who brought Nathanael', testament: 'new' },
  { word: 'THOMAS', clue: 'Doubted until he saw Jesus', testament: 'new' },
  { word: 'LAZARUS', clue: 'Raised from the dead by Jesus', testament: 'new' },
  { word: 'MARTHA', clue: "Lazarus' sister who served", testament: 'new' },
  { word: 'STEPHEN', clue: 'First Christian martyr', testament: 'new' },
  { word: 'TIMOTHY', clue: "Paul's young companion", testament: 'new' },
  // Old Testament
  { word: 'ABRAHAM', clue: 'Father of many nations', testament: 'old' },
  { word: 'SARAH', clue: "Abraham's wife, mother of Isaac", testament: 'old' },
  { word: 'JOSEPH', clue: 'Dreamer who became ruler of Egypt', testament: 'old' },
  { word: 'SOLOMON', clue: 'Wisest king of Israel', testament: 'old' },
  { word: 'SAMUEL', clue: 'Prophet who anointed kings', testament: 'old' },
  { word: 'JONAH', clue: 'Swallowed by a great fish', testament: 'old' },
  { word: 'DANIEL', clue: "Survived the lion's den", testament: 'old' },
  { word: 'ELIJAH', clue: 'Prophet taken up in a whirlwind', testament: 'old' },
];

// Hard words (7-10 letters)
export const HARD_WORDS: WordEntry[] = [
  // New Testament
  { word: 'THADDEUS', clue: 'Disciple also called Jude', testament: 'new' },
  { word: 'BARNABAS', clue: 'Encourager and companion of Paul', testament: 'new' },
  { word: 'NICODEMUS', clue: 'Pharisee who visited Jesus at night', testament: 'new' },
  { word: 'ELIZABETH', clue: "John the Baptist's mother", testament: 'new' },
  { word: 'ZACCHAEUS', clue: 'Tax collector who climbed a tree', testament: 'new' },
  { word: 'MATTHIAS', clue: 'Replaced Judas as apostle', testament: 'new' },
  { word: 'CORNELIUS', clue: 'Roman centurion converted by Peter', testament: 'new' },
  // Old Testament
  { word: 'JEREMIAH', clue: 'Weeping prophet of Judah', testament: 'old' },
  { word: 'EZEKIEL', clue: 'Prophet of visions and symbols', testament: 'old' },
  { word: 'NEHEMIAH', clue: 'Rebuilt the walls of Jerusalem', testament: 'old' },
  { word: 'ZECHARIAH', clue: 'Prophet who saw visions', testament: 'old' },
  { word: 'REBEKAH', clue: "Isaac's wife who bore twins", testament: 'old' },
  { word: 'DEBORAH', clue: 'Judge and prophetess of Israel', testament: 'old' },
  { word: 'JOSHUA', clue: 'Led Israel into Promised Land', testament: 'old' },
  { word: 'GIDEON', clue: 'Defeated Midianites with 300 men', testament: 'old' },
];

// Expert words (8-11 letters, more challenging)
export const EXPERT_WORDS: WordEntry[] = [
  // New Testament
  { word: 'BARTHOLOMEW', clue: 'Disciple also known as Nathanael', testament: 'new' },
  { word: 'BARABBAS', clue: 'Criminal released instead of Jesus', testament: 'new' },
  { word: 'GAMALIEL', clue: 'Wise Pharisee who taught Paul', testament: 'new' },
  { word: 'APOLLOS', clue: 'Eloquent preacher from Alexandria', testament: 'new' },
  { word: 'PRISCILLA', clue: 'Teacher who helped Apollos', testament: 'new' },
  { word: 'SILAS', clue: 'Missionary companion of Paul', testament: 'new' },
  // Old Testament
  { word: 'MELCHIZEDEK', clue: 'Mysterious priest-king of Salem', testament: 'old' },
  { word: 'HEZEKIAH', clue: 'Righteous king who prayed for healing', testament: 'old' },
  { word: 'SHADRACH', clue: 'Survived the fiery furnace', testament: 'old' },
  { word: 'MESHACH', clue: 'Survived the fiery furnace with friends', testament: 'old' },
  { word: 'ABEDNEGO', clue: 'Third friend in the fiery furnace', testament: 'old' },
  { word: 'EZRA', clue: 'Priest and scribe who led return', testament: 'old' },
  { word: 'HABAKKUK', clue: 'Prophet who questioned God', testament: 'old' },
  { word: 'OBADIAH', clue: 'Prophet against Edom', testament: 'old' },
];

// Master words (all lengths, most challenging mix)
export const MASTER_WORDS: WordEntry[] = [
  ...EASY_WORDS.slice(0, 3),
  ...MEDIUM_WORDS.slice(0, 3),
  ...HARD_WORDS.slice(0, 4),
  ...EXPERT_WORDS.slice(0, 5),
];

export interface GeneratedWord {
  word: string;
  clue: string;
  startRow: number;
  startCol: number;
  direction: 'across' | 'down';
  number: number;
}

export interface CrosswordPuzzle {
  words: GeneratedWord[];
  boardSize: number;
}

// Helper to check if a word can be placed at a position
function canPlaceWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: 'across' | 'down'
): boolean {
  const boardSize = grid.length;
  
  // Check boundaries
  if (direction === 'across') {
    if (col + word.length > boardSize) return false;
  } else {
    if (row + word.length > boardSize) return false;
  }

  // Check each position
  for (let i = 0; i < word.length; i++) {
    const r = direction === 'across' ? row : row + i;
    const c = direction === 'across' ? col + i : col;
    
    // If cell is not empty, it must match the word's letter
    if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
      return false;
    }
  }

  // Check for invalid adjacencies (parallel words touching)
  for (let i = 0; i < word.length; i++) {
    const r = direction === 'across' ? row : row + i;
    const c = direction === 'across' ? col + i : col;
    
    if (direction === 'across') {
      // Check above and below
      if (r > 0 && grid[r - 1][c] !== '' && grid[r][c] === '') return false;
      if (r < boardSize - 1 && grid[r + 1][c] !== '' && grid[r][c] === '') return false;
    } else {
      // Check left and right
      if (c > 0 && grid[r][c - 1] !== '' && grid[r][c] === '') return false;
      if (c < boardSize - 1 && grid[r][c + 1] !== '' && grid[r][c] === '') return false;
    }
  }

  // Check before and after the word
  if (direction === 'across') {
    if (col > 0 && grid[row][col - 1] !== '') return false;
    if (col + word.length < boardSize && grid[row][col + word.length] !== '') return false;
  } else {
    if (row > 0 && grid[row - 1][col] !== '') return false;
    if (row + word.length < boardSize && grid[row + word.length][col] !== '') return false;
  }

  return true;
}

// Place word on grid
function placeWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: 'across' | 'down'
): void {
  for (let i = 0; i < word.length; i++) {
    const r = direction === 'across' ? row : row + i;
    const c = direction === 'across' ? col + i : col;
    grid[r][c] = word[i];
  }
}

// Find intersection points between two words
function findIntersections(word1: string, word2: string): Array<[number, number]> {
  const intersections: Array<[number, number]> = [];
  for (let i = 0; i < word1.length; i++) {
    for (let j = 0; j < word2.length; j++) {
      if (word1[i] === word2[j]) {
        intersections.push([i, j]);
      }
    }
  }
  return intersections;
}

// Generate a crossword puzzle
export function generateCrossword(difficulty: 'easy' | 'medium' | 'hard' | 'expert' | 'master'): CrosswordPuzzle {
  const boardSize = 15;
  
  // Select word pool based on difficulty
  let wordPool: WordEntry[] = [];
  let targetWordCount = 0;
  
  switch (difficulty) {
    case 'easy':
      wordPool = [...EASY_WORDS];
      targetWordCount = 6;
      break;
    case 'medium':
      wordPool = [...EASY_WORDS, ...MEDIUM_WORDS];
      targetWordCount = 8;
      break;
    case 'hard':
      wordPool = [...MEDIUM_WORDS, ...HARD_WORDS];
      targetWordCount = 10;
      break;
    case 'expert':
      wordPool = [...HARD_WORDS, ...EXPERT_WORDS];
      targetWordCount = 12;
      break;
    case 'master':
      wordPool = [...MASTER_WORDS, ...EXPERT_WORDS];
      targetWordCount = 14;
      break;
  }

  // Shuffle word pool
  wordPool = wordPool.sort(() => Math.random() - 0.5);
  
  const grid: string[][] = Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(''));
  
  const placedWords: GeneratedWord[] = [];
  let wordNumber = 1;
  
  // Place first word in the center
  if (wordPool.length > 0) {
    const firstWord = wordPool[0];
    const startRow = Math.floor(boardSize / 2);
    const startCol = Math.floor((boardSize - firstWord.word.length) / 2);
    
    placeWord(grid, firstWord.word, startRow, startCol, 'across');
    placedWords.push({
      word: firstWord.word,
      clue: firstWord.clue,
      startRow,
      startCol,
      direction: 'across',
      number: wordNumber++,
    });
  }

  // Try to place remaining words
  let attempts = 0;
  const maxAttempts = 1000;
  
  for (let i = 1; i < wordPool.length && placedWords.length < targetWordCount && attempts < maxAttempts; i++) {
    const currentWord = wordPool[i];
    let placed = false;
    
    // Try to intersect with existing words
    for (const placedWord of placedWords) {
      if (placed) break;
      
      const intersections = findIntersections(placedWord.word, currentWord.word);
      
      for (const [pos1, pos2] of intersections) {
        if (placed) break;
        attempts++;
        
        // Calculate position for current word based on intersection
        const newDirection: 'across' | 'down' = placedWord.direction === 'across' ? 'down' : 'across';
        
        let newRow: number, newCol: number;
        if (placedWord.direction === 'across') {
          newRow = placedWord.startRow - pos2;
          newCol = placedWord.startCol + pos1;
        } else {
          newRow = placedWord.startRow + pos1;
          newCol = placedWord.startCol - pos2;
        }
        
        // Check if we can place the word
        if (newRow >= 0 && newCol >= 0 && 
            canPlaceWord(grid, currentWord.word, newRow, newCol, newDirection)) {
          placeWord(grid, currentWord.word, newRow, newCol, newDirection);
          placedWords.push({
            word: currentWord.word,
            clue: currentWord.clue,
            startRow: newRow,
            startCol: newCol,
            direction: newDirection,
            number: wordNumber++,
          });
          placed = true;
        }
      }
    }
    
    // If not placed through intersection, try random placement
    if (!placed && attempts < maxAttempts - 100) {
      for (let tryCount = 0; tryCount < 50 && !placed; tryCount++) {
        attempts++;
        const direction: 'across' | 'down' = Math.random() > 0.5 ? 'across' : 'down';
        const maxRow = direction === 'across' ? boardSize - 1 : boardSize - currentWord.word.length;
        const maxCol = direction === 'across' ? boardSize - currentWord.word.length : boardSize - 1;
        
        const row = Math.floor(Math.random() * (maxRow + 1));
        const col = Math.floor(Math.random() * (maxCol + 1));
        
        if (canPlaceWord(grid, currentWord.word, row, col, direction)) {
          placeWord(grid, currentWord.word, row, col, direction);
          placedWords.push({
            word: currentWord.word,
            clue: currentWord.clue,
            startRow: row,
            startCol: col,
            direction,
            number: wordNumber++,
          });
          placed = true;
        }
      }
    }
  }
  
  // Renumber words based on position (top to bottom, left to right)
  placedWords.sort((a, b) => {
    if (a.startRow !== b.startRow) return a.startRow - b.startRow;
    return a.startCol - b.startCol;
  });
  
  placedWords.forEach((word, index) => {
    word.number = index + 1;
  });

  return {
    words: placedWords,
    boardSize,
  };
}
