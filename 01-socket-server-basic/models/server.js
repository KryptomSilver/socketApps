const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Http Server
    this.server = http.createServer(this.app);
    //Configuración de los sockets
    this.io = socketIo(this.server, {});
  }
  middlewares() {
    //Desplegar el directoro publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }
  configuracionSockets() {
    new Sockets(this.io);
  }
  execute() {
    //Inicializar sockets
    this.configuracionSockets();
    //Inicializar middlewares
    this.middlewares();
    //Inicializar el server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en el puerto:", this.port);
    });
  }
}
module.exports = Server;
