// const readline = require('readline');

// // Quiz questions
// const questions = [
//   {
//     question: 'Which method is used to create components in React.js?',
//     options: ['useState', 'render', 'useEffect', 'createElement'],
//     answer: 'createElement',
//     topic: 'React.js'
//   },
//   {
//     question: 'Which of the following is a core module in Node.js?',
//     options: ['express', 'http', 'mongoose', 'react-router'],
//     answer: 'http',
//     topic: 'Node.js'
//   },
//   {
//     question: 'How do you center a div in CSS using flexbox?',
//     options: [
//       'justify-content: center; align-items: center;',
//       'display: block;',
//       'text-align: center;',
//       'position: absolute;'
//     ],
//     answer: 'justify-content: center; align-items: center;',
//     topic: 'CSS'
//   },
//   {
//     question: 'What is the primary use of React Native?',
//     options: [
//       'Building web applications',
//       'Building mobile applications',
//       'Building desktop applications',
//       'Testing React components'
//     ],
//     answer: 'Building mobile applications',
//     topic: 'React Native'
//   },
//   {
//     question: 'In MongoDB, what is the default ID field created in each document?',
//     options: ['_id', 'id', '_docID', '_mongoID'],
//     answer: '_id',
//     topic: 'MongoDB'
//   },
//   {
//     question: 'Which principle refers to the practice of ensuring user interfaces are simple and easy to use?',
//     options: [
//       'User-centered design',
//       'Consistency',
//       'Aesthetic design',
//       'Intuitive design'
//     ],
//     answer: 'Intuitive design',
//     topic: 'UX/UI Design'
//   },
//   {
//     question: 'Which function is used to handle state in functional components in React?',
//     options: ['setState', 'useEffect', 'useState', 'handleState'],
//     answer: 'useState',
//     topic: 'React.js'
//   },
//   {
//     question: 'How do you create a server in Node.js?',
//     options: [
//       'server.create()',
//       'http.createServer()',
//       'app.listen()',
//       'server.listen()'
//     ],
//     answer: 'http.createServer()',
//     topic: 'Node.js'
//   },
//   {
//     question: 'Which CSS property is used to change the text color?',
//     options: ['font-color', 'text-color', 'color', 'background-color'],
//     answer: 'color',
//     topic: 'CSS'
//   },
//   {
//     question: 'Which of the following libraries can be used to navigate between screens in React Native?',
//     options: ['React Router', 'React Navigation', 'Flux', 'Axios'],
//     answer: 'React Navigation',
//     topic: 'React Native'
//   }
// ];

// // Quiz variables
// let currentQuestion = 0;
// let score = 0;
// const questionTimeLimit = 30; // Time limit for each question in seconds
// let questionTimer;
// let playerName = '';

// // Create readline interface
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// // Function to ask a question asynchronously
// const askQuestion = (q) => {
//   return new Promise((resolve) => {
//     let remainingTime = questionTimeLimit;

//     // Display the question and options
//     console.log(`\nTopic: ${q.topic}`);
//     console.log(q.question);
//     q.options.forEach((option, index) => {
//       console.log(`${index + 1}. ${option}`);
//     });

//     // Initial display of the countdown timer
//     process.stdout.write(`Time remaining: ${remainingTime}s\r`);

//     // Countdown timer for the current question
//     questionTimer = setInterval(() => {
//       remainingTime--;

//       // Update the timer on the same line
//       process.stdout.write(`Time remaining: ${remainingTime}s\r`);

//       if (remainingTime <= 0) {
//         clearInterval(questionTimer);
//         process.stdout.write('\n'); // Move to a new line after countdown finishes
//         resolve(null); // Time ran out
//       }
//     }, 1000);

//     // Asynchronously get the answer from the user
//     rl.question('Select your answer (1-4): ', (answer) => {
//       clearInterval(questionTimer); // Clear question timer
//       process.stdout.write('\n'); // Move to a new line after the user input
//       const answerIndex = parseInt(answer) - 1;
//       if (!isNaN(answerIndex) && answerIndex >= 0 && answerIndex < q.options.length) {
//         resolve(q.options[answerIndex]); // Return the selected answer
//       } else {
//         console.log('Invalid input. Moving to the next question.');
//         resolve(null); // Invalid input, treat as no answer
//       }
//     });
//   });
// };

// // starts the quiz
// const startQuiz = async () => {
//   console.log(`\nWelcome, ${playerName}! The quiz is about to start. You have 30 seconds per question.\n`);

//   // Loop through questions
//   while (currentQuestion < questions.length) {
//     const userAnswer = await askQuestion(questions[currentQuestion]);

//     if (userAnswer === null) {
//       console.log('Time ran out or invalid input for this question.\n');
//     } else if (userAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
//       console.log('Correct!\n');
//       score++;
//     } else {
//       console.log(`Incorrect. The correct answer was: ${questions[currentQuestion].answer}\n`);
//     }

//     currentQuestion++;
//   }

//   rl.close();
//   displayFinalScore();
// };

// // displays the final score
// const displayFinalScore = () => {
//   console.log(`\nQuiz finished! ${playerName}, your final score is: ${score}/${questions.length}`);
// };

// // player must input their name before starting the quiz
// rl.question('Please enter your name: ', (name) => {
//   playerName = name.trim();
//   startQuiz();
// });


const readline = require('readline');
const { clearLine, cursorTo } = require('readline');

class QuizGame {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestion = 0;
    this.score = 0;
    this.questionTimeLimit = 30;
    this.playerName = '';
    
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  // Utility to clear the current line in console
  clearCurrentLine() {
    clearLine(process.stdout, 0);
    cursorTo(process.stdout, 0);
  }

  // Display timer
  updateTimer(seconds) {
    this.clearCurrentLine();
    process.stdout.write(`⏱️  Time remaining: ${seconds}s`);
  }

  // Ask a single question
  async askQuestion(question) {
    return new Promise((resolve) => {
      let remainingTime = this.questionTimeLimit;
      
      // Display question and options
      console.log(`\n📚 Topic: ${question.topic}`);
      console.log(`❓ ${question.question}\n`);
      
      question.options.forEach((option, index) => {
        console.log(`   ${index + 1}. ${option}`);
      });
      console.log(''); // Empty line for spacing

      // Start timer
      const timer = setInterval(() => {
        remainingTime--;
        this.updateTimer(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(timer);
          console.log('\n⌛ Time's up!');
          resolve(null);
        }
      }, 1000);

      // Get user input
      this.rl.question('✍️  Your answer (1-4): ', (answer) => {
        clearInterval(timer);
        this.clearCurrentLine();
        
        const answerIndex = parseInt(answer) - 1;
        if (!isNaN(answerIndex) && answerIndex >= 0 && answerIndex < question.options.length) {
          resolve(question.options[answerIndex]);
        } else {
          resolve(null);
        }
      });
    });
  }

  // Display final results with a nice format
  displayResults() {
    const percentage = (this.score / this.questions.length) * 100;
    console.log('\n📊 Quiz Results');
    console.log('================');
    console.log(`👤 Player: ${this.playerName}`);
    console.log(`✅ Score: ${this.score}/${this.questions.length} (${percentage.toFixed(1)}%)`);
    
    let feedback;
    if (percentage >= 90) feedback = "Outstanding! You're a tech expert! 🏆";
    else if (percentage >= 70) feedback = "Great job! Keep learning! 🌟";
    else if (percentage >= 50) feedback = "Good effort! Room for improvement! 📚";
    else feedback = "Keep practicing! You'll get better! 💪";
    
    console.log(`\n${feedback}\n`);
  }

  // Main game loop
  async start() {
    // Get player name
    this.playerName = await new Promise(resolve => {
      this.rl.question('👋 Please enter your name: ', name => {
        resolve(name.trim() || 'Player');
      });
    });

    console.log(`\n🎮 Welcome ${this.playerName}! The quiz is about to start.`);
    console.log('ℹ️  You have 30 seconds per question.\n');
    
    // Loop through questions
    for (const question of this.questions) {
      const userAnswer = await this.askQuestion(question);
      
      if (!userAnswer) {
        console.log('❌ No valid answer provided.');
      } else if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
        console.log('✨ Correct!');
        this.score++;
      } else {
        console.log(`❌ Incorrect. The correct answer was: ${question.answer}`);
      }
      
      this.currentQuestion++;
      
      // Small pause between questions
      if (this.currentQuestion < this.questions.length) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }

    // Display final results and close
    this.displayResults();
    this.rl.close();
  }
}

// Start the quiz
const quiz = new QuizGame(questions);
quiz.start();