import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('sendNotification', (data) => {
    if(data.from == 'admin') {
      io.emit('receiveNotificationFromAdmin', data);
    } else {
      io.emit('receiveNotificationFromUser', data);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 4001;

server.listen(PORT, () => {
  console.log(`Socket.IO server is running on port ${PORT}`);
});
