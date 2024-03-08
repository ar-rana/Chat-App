const express = require('express');
const http = require('http');
const socketio = require("socket.io");
const cors = require('cors');
const { addUser, getUser, removeUser } = require('./helper');
const mongoDB = "mongodb+srv://chat-user:db.rana@cluster0.12z8wrh.mongodb.net/Chat?retryWrites=true&w=majority"
const mongoose = require('mongoose');
const Room = require('./models/Room.js');
const Message = require('./models/Messages.js');
const authRoutes = require('./routes/authRoutes.js'); 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const MONGODB_URL = require('./MongoAPI.js');

const app = express();

const options = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}
app.use(cors(options));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authRoutes);
//app.use(express.json())
const server = http.createServer(app);
const io = socketio(server, {
  cors:{
    origin: 'http://localhost:3000'
  }
});

const PORT  = process.env.PORT || 3001;

mongoose.connect(MONGODB_URL,{connectTimeoutMS: 30000}).then(()=>console.log("database connected")).catch(err=>console.log(err));

app.get('/set-cookies', function (req, res) {

  // res.cookie('username', 'you');
  // res.cookie('isAuthnticated',true);
  // res.send('cookies are set')

})
 
io.on('connect', (socket) => {
  Room.find().then(result=>{
    socket.emit('output-rooms',result)
    console.log(result)
  });
  
  console.log(socket.id);
  console.log("connected");
    socket.on('create-room', (name)=>{
        console.log(name);
        const room = new Room({ name });
        room.save().then(result=>{
          io.emit('room-created',result)
        })
    })
    socket.on("join",({name, room_id, user_id})=>{
      const {error , user} = addUser({
        socket_id: socket.id,
        name,
        room_id,
        user_id
      })
      socket.join(room_id)
      if (error){
        console.log("error", error)
      }else{
        console.log('joined user: ',user)
      }

    })
    socket.on("sendMessage",(message, room_id, callback) =>{
      const user = getUser(socket.id);
      console.log(message)
      const msgToStore = {
        name: user.name,
        user_id: user.user_id,
        room_id: room_id,
        text: message
      }
      console.log('message', msgToStore);
      const msg = new Message(msgToStore);
      msg.save().then(result=>{
        console.log(result)
        io.to(room_id).emit('message',result);
        callback();
      })
      // io.to(room_id).emit('message', msgToStore);
    })
    socket.on('disconnect',()=>{
      const user = removeUser(socket.id);
    })
});

server.listen(PORT, () => {
  console.log('server running at http://localhost:3001');
});