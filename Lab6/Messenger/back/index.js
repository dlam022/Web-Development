
const express = require("express");
const socketIO = require('socket.io');
const http = require('http');
const cors  = require("cors");
const session = require('express-session');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require( 'body-parser');

const app = express(); 
const server = http.createServer(app);



// TODO: add cors to allow cross origin requests
const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});
app.use(cors({origin: 'http://localhost:3000', credentials:true}))



dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Connect to the database
// TODO: your code here
mongoose.connect(process.env.MONGO_URL);
const database = mongoose.connection;
database.on('error', (error) => console.error(error));
database.once('open', () => console.log('Connected to Database'));


// Set up the session
// TODO: your code here
const sessionMiddleware = session({
  resave: false, //whether to save the session to the store on every request
  saveUninitialized: false, //whether to save uninitialized sessions to the store
  secret: process.env.SESSION_SECRET,
})

app.use(sessionMiddleware);


const routes = require('./routes/auth');
const rooms = require('./routes/rooms');
const { error } = require("console");


app.get('/', (req, res) => {
  if (req.session && req.session.authenticated) {
    res.json({ message: "logged in" });
  }
  else {  
    console.log("not logged in")
    res.json({ message: "not logged" });
  }
});


app.use("/api/auth/", routes);


// checking the session before accessing the rooms
app.use((req, res, next) => {
  if (req.session && req.session.authenticated) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
});
app.use("/api/rooms/", rooms);



// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});


// TODO: make sure that the user is logged in before connecting to the socket
// TODO: your code here
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.use((socket, next) => {
  //check if the user is authenticated
  if(socket.request.session && socket.request.session.authenticated) {
    next();
  }
  else{
    console.log("unauthorized");
    next(new Error('unauthroized'));
  }
});


io.on('connection', (socket)=>{
  let room = undefined;
  let userName = socket.request.session.username;
  console.log("user connected")
  // TODO: write codes for the messaging functionality
  // TODO: your code here
  //when user join, load all the messages prior before user join  
  socketIO.on("disconnect", () => {
    console.log("user Disconnected")
  })

  socketIO.on("chat message", (data) => {
    console.log("got the message iNDEXJS", data)
    io.to(room).emit("chat message", data)
  })

  socketIO.on("join", (data) => {
    socketIO.join(data.room);
    room = data.room;
    userName = data.username;
    console.log('user is joined to room ${data.room}')
  })

  socketIO.emit("starting data", {"text":"hi"});



})