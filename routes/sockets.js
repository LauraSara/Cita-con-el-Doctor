module.exports = function(server){
  // Ahora creamos nuestras funciones de Sockets
  const io = require('socket.io')(server);
  // cuando me conecte con algún cliente
  io.on('connection', function (socket) {
  
    socket.on('message', function (data) {
      console.log(data);
      socket.broadcast.emit('messageIn', data);
  
    });
  
  });

}

