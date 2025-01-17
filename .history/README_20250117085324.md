Important: Only Run the CODEGAME (node codegame)

Quiz Application
This is a Node.js-based quiz application with multiple-choice questions. The application quizzes users on topics related to React.js, Node.js, CSS, React Native, MongoDB, and UX/UI Design. Each question has a 30-second time limit, and the player's name is requested before starting the quiz. The final score is displayed at the end of the game.

Features
Multiple-choice questions on topics like React.js, Node.js, CSS, React Native, MongoDB, and UX/UI Design.
30-second time limit for each question with a countdown displayed on the same line.
Asks for the player's name before starting the quiz.
Displays a personalized welcome message and final score based on the player's performance.
Handles invalid inputs and times out if the player doesn't answer within the given time.
Prerequisites
Before running the application, make sure you have the following installed:

Node.js (v12.0.0 or higher)
npm (Node Package Manager)
How to Run
Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/quiz-app.git
Navigate to the project directory:

bash
Copy code
cd quiz-app
Install dependencies:

bash
Copy code
npm install
Note: There are no external dependencies in this basic quiz application, but this step is included for completeness in case you want to add any in the future.

Run the application:

bash
Copy code
node quiz.js
Start Playing:

After running the application, you will be prompted to enter your name.
The quiz will start with a personalized greeting.
You will be presented with 10 multiple-choice questions, each with 4 options.
You have 30 seconds to answer each question. If you don't answer in time or provide invalid input, it will count as a skipped question.
Example Usage
bash
Copy code
$ node quiz.js

Please enter your name: Zack
Welcome, Zack! The quiz is about to start. You have 30 seconds per question.

Topic: React.js
Which method is used to create components in React.js?
1. useState
2. render
3. useEffect
4. createElement
Select your answer (1-4): 4
Correct!

Topic: Node.js
Which of the following is a core module in Node.js?
1. express
2. http
3. mongoose
4. react-router
Select your answer (1-4): 2
Correct!

...

Quiz finished! Zack, your final score is: 8/10
Code Structure
quiz.js: The main script containing the logic for the quiz.
It uses readline to handle input from the user.
Questions are stored in an array, and each question has a 30-second timer.
The quiz dynamically moves to the next question after the user answers or the time runs out.
Future Enhancements
Add a scoring leaderboard to track top players.
Use a database to store player data and quiz questions.
Add a GUI for an interactive web-based version.
Randomize the order of the questions for each game session.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Author
Sbuda Malloya