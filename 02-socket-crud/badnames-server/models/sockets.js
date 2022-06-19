const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
    this.socketsEvents();
  }
  socketsEvents() {
    //On connection
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");
      //Emitir al cliente conectado, todas las bandas
      socket.emit("current-bands", this.bandList.getBands());
      //Votar por la banda
      socket.on("votar-banda", (id) => {
        this.bandList.increaseVotes(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("borrar-banda", (id) => {
        this.bandList.removeBand(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("cambiar-banda", (banda) => {
        this.bandList.changeBandName(banda.idBanda, banda.nombreBanda);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("crear-banda", ({nombreBanda}) => {
        this.bandList.addBand(nombreBanda);
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}
module.exports = Sockets;
