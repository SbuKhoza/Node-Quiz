const readline = require('readline');

// Quiz questions array remains the same
const questions = [
  {
    question: 'Which method is used to create components in React.js?',
    options: ['useState', 'render', 'useEffect', 'createElement'],
    answer: 'createElement',
    topic: 'React.js'
  },
  // ... rest of the questions remain the same
];

let currentQuestion = 0;
let score = 0;
const questionTimeLimit = 30;
let questionTimer;
let playerName = '';

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to clear the current line
const clearLine = () => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
};

// Function to ask a question asynchronously
const askQuestion = (q) => {
  return new Promise((resolve) => {
    let remainingTime = questionTimeLimit;
    let userInput = '';

    // Display the question and options
    console.log(`\nTopic: ${q.topic}`);
    console.log(q.question);
    q.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
    console.log('\n'); // Add extra line for spacing

    // Handle user input
    process.stdin.on('keypress', (char, key) => {
      if (key && key.name === 'return') {
        clearLine();
        const answerIndex = parseInt(userInput) - 1;
        if (!isNaN(answerIndex) && answerIndex >= 0 && answerIndex < q.options.length) {
          process.stdin.removeAllListeners('keypress');
          resolve(q.options[answerIndex]);
        } else {
          process.stdin.removeAllListeners('keypress');
          resolve(null);
        }
      } else if (key && key.name === 'backspace') {
        userInput = userInput.slice(0, -1);
        clearLine();
        process.stdout.write(`Time remaining: ${remainingTime}s | Your answer (1-4): ${userInput}`);
      } else if (char && /[1-4]/.test(char) && userInput.length < 1) {
        userInput += char;
        clearLine();
        process.stdout.write(`Time remaining: ${remainingTime}s | Your answer (1-4): ${userInput}`);
      }
    });

    // Enable raw mode to capture keypress events
    process.stdin.setRawMode(true);

    // Display initial prompt
    process.stdout.write(`Time remaining: ${remainingTime}s | Your answer (1-4): `);

    // Countdown timer
    questionTimer = setInterval(() => {
      remainingTime--;
      clearLine();
      process.stdout.write(`Time remaining: ${remainingTime}s | Your answer (1-4): ${userInput}`);

      if (remainingTime <= 0) {
        clearInterval(questionTimer);
        process.stdin.removeAllListeners('keypress');
        process.stdin.setRawMode(false);
        console.log('\n'); // Move to next line after timeout
        resolve(null);
      }
    }, 1000);
  });
};

// Start quiz function
const startQuiz = async () => {
  console.log(`\nWelcome, ${playerName}! The quiz is about to start. You have 30 seconds per question.\n`);

  while (currentQuestion < questions.length) {
    const userAnswer = await askQuestion(questions[currentQuestion]);
    
    if (userAnswer === null) {
      console.log('Time ran out or invalid input for this question.\n');
    } else if (userAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
      console.log('Correct!\n');
      score++;
    } else {
      console.log(`Incorrect. The correct answer was: ${questions[currentQuestion].answer}\n`);
    }

    currentQuestion++;
  }

  // Reset raw mode and close readline
  process.stdin.setRawMode(false);
  rl.close();
  displayFinalScore();
};

// Display final score function
const displayFinalScore = () => {
  console.log(`\nQuiz finished! ${playerName}, your final score is: ${score}/${questions.length}`);
};

// Get player name and start quiz
rl.question('Please enter your name: ', (name) => {
  playerName = name.trim();
  startQuiz();
});