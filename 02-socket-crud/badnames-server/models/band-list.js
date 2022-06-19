const Band = require("./band");

class BandList {
  constructor() {
    this.bands = [new Band("Metalica"), new Band("ACDC")];
  }
  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }
  removeBand(idBand) {
    this.bands = this.bands.filter((band) => band.id !== idBand);
  }
  getBands() {
    return this.bands;
  }
  increaseVotes(idBand) {
    this.bands = this.bands.map((band) => {
      if (band.id == idBand) {
        band.votes += 1;
      }
      return band;
    });
  }
  changeBandName(idBand, newName) {
    this.bands = this.bands.map((band) => {
      if (band.id == idBand) {
        band.name = newName;
      }
      return band;
    });
  }
}
module.exports = BandList;
