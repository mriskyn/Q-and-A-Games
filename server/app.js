<<<<<<< HEAD
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let user=[]
let room=[]
io.on('connection', (socket) => {


  io.emit('transfer-name',user)
  console.log('a user connected');
  socket.on('input-name',(data)=>{
    user.push(data)
    io.emit('transfer-name',user)
  })
=======
const express = require('express');
const cors = require('cors');
const router = require('./routes');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded( { extended: true }));

app.use(router);

>>>>>>> questions-feature

  io.emit('transfer-room',room)
  socket.on('input-room',(data)=>{
    room.push(data)
    io.emit('transfer-room',room)
  })

  socket.on('start',()=>{
      io.of('/room').emit("start game")
  })


});

http.listen(3000, () => {
  console.log('listening on *:3000');
});