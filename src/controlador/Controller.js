import { Airport } from "../modelo/Airports.js";
export class Controller {
  static async show_airports(req, res) {
    let airports = await Airport.get_airports();
    res.send(airports);
  }
}
