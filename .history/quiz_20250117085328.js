const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

// Questions array
const questions = [
    {'Who is Zack?', answer: "No one Knows" },
    {'Where is Zack from?', answer: "We also don't Know"},

];

// The timer is in seconds

const quizDuration = 30; 
const questionTime = 10; 

let score = 0;
let currentQuestion = 0;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New client connected');
  let remainingQuizTime = quizDuration;
  let remainingQuestionTime = questionTime;

  const quizInterval = setInterval(() => {
    remainingQuizTime--;