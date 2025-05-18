const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let contador = 0;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.emit('contador', contador);

  socket.on('incrementar', () => {
    contador++;
    io.emit('contador', contador);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
