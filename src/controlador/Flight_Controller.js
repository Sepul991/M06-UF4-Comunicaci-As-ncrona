import { Flights } from "../modelo/Flights.js";
export class FController {
  static async show_flights(req, res) {
    let flights = await Flights.get_flights();
    res.send(flights);
  }

  static async show_airports(req, res) {
    let airports = await Flights.get_airports();
    res.send(airports);
  }

  static async show_aircrafts(req, res) {
    let aircrafts = await Flights.get_aircrafts();
    res.send(aircrafts);
  }
}
