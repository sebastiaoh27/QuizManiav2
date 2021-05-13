var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var roomRest = require("./routes/rooms")
var userRest = require("./routes/users")
var quizRest = require("./routes/quizzes")
var questionRest = require("./routes/questions")
var sessionRest  = require("./routes/sessions")
const urlencoded = require("body-parser/lib/types/urlencoded");
var io = require('socket.io')()

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

const server = require('http').createServer(app);
//const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));
app.use(requireHTTPS)
app.listen(process.env.PORT || 3000)
//server.listen(3000);
app.use(express.static('./dist/quiz-maniav2'))

app.get('/', (req,res)=>{
  res.sendFile('index.html',{root: '/dist/quiz-maniav2/'})
})

//room
app.get('/api/rooms',roomRest);
app.get('/api/room/:id',roomRest)
app.get('/api/joinRoom/:password',roomRest)
app.post('/api/createRoom',roomRest)
app.patch('/api/selectQuiz/:id',roomRest)
app.delete('/api/deleteRoom/:id',roomRest)


//user
app.post('/api/createUser',userRest);
app.get('/api/users',userRest);
app.get('/api/user/:id',userRest);
app.get('/api/users/:roomId',userRest)
app.get('/api/winner/:roomId',userRest)
app.patch('/api/increasePoints/:id',userRest)
app.patch('/api/resetPoints/:roomId',userRest)
app.delete('/api/deleteUser/:id',userRest)

//quiz
app.post('/api/createQuiz',quizRest)
app.get('/api/quizzes',quizRest)
app.get('/api/quiz/:id',quizRest)
app.get('/api/quizzes/:themeId',quizRest)
app.patch('/api/setTheme/:id',quizRest)
app.delete('/api/deleteQuiz/:id',quizRest)

//question
app.post('/api/createQuestion',questionRest)
app.get('/api/questions',questionRest)
app.get('/api/question/:id',questionRest)
app.get('/api/questions/:roomId',questionRest)
app.patch('/api/editQuestion/:id',questionRest)
app.delete('/api/deleteQuestion/:id',questionRest)

// session
app.post('/api/createSession',sessionRest)
app.get('/api/getUser/:id',sessionRest)
app.get('/api/getRoom/:id',sessionRest)
app.patch('/api/setUser/:id',sessionRest)
app.patch('/api/setRoom/:id',sessionRest)



