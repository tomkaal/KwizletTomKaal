var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session   = require("express-session");
var mongoose = require('mongoose');
var http = require('http');
var socketio = require('socket.io');
var quiz = require("./routes/quiz");

// Setup
var app = express();
var httpServer = http.Server(app);
var io = socketio(httpServer);

app.use(express.static(path.join(__dirname, '../public')));

// view engine setup
app.set('views', path.join(__dirname, '../public/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret: "Teemo"
}));

// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/kwizletDB');

// Models
var Quiz = require('./models/quiz');
var Question = require('./models/question');

// Serverside Routes
var routes = require('./routes/index');
var quizRoutes = express.Router('Quizes');
var questionRoutes = express.Router('Questions');


app.use('/quiz', quiz);
app.use('/api/v1/quizes', quizRoutes);
app.use('/api/v1/questions', questionRoutes);
app.use('/', routes);


// WebSockets
var students = {};

io.on("connection",function(socket){
    console.log("CONNECT:", socket.id);

    socket.on("disconnect", function(){
        console.log("DISCONNECT", socket.id);
        // Let's handle disconnects by informing everyone,
        // and removing the student from our students.
        socket.broadcast.emit("student has left", socket.id)  // the socket id is enough for
        // all others to remove the student.
        delete students[socket.id]  // this removes the student from the object.
    });


    socket.on("sign in", function(name){
        console.log("SIGN IN:", name);

        var newStudent = {
            name:     name,
            score:    0,
            socketId: socket.id     // This id is useful to identify students.
            // We don't have to worry about duplicate student names.
        };
        students[newStudent.socketId] = newStudent;
        socket.emit("sign in reply", students );
        socket.broadcast.emit("new student",newStudent);
    })

    socket.on("update student", function(studentInfo){
        socket.broadcast.emit("update other student", studentInfo);

        // In class, we used a for-loop to find the student in the array, like this:
        // for( var idx=0; idx< students.length; idx++) {
        //    if( studentInfo.name === students[idx].name ) {
        //       students[idx] = studentInfo;
        //    }
        // }
        // Now, because we use an object to store all students, we just need this:
        students[studentInfo.socketId] = studentInfo;
    });
});

// Start app
httpServer.listen(3000, function(){
    console.log("Server running on port 3000.");
});
