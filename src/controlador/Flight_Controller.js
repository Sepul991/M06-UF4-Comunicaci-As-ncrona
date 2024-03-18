import { Flights } from "../modelo/Flights.js";

export class FController {
  static async show_flights(req, res) {
    console.log("GET");
    try {
      // Agafa els parametres enviats per URL
      const skip = req.query.skip;
      const limit = req.query.limit;

      console.log("Skip:", skip, "- Limit:", limit);

      const flights = await Flights.get_flights(skip, limit);

      res.json({ success: true, flights: flights });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async show_flight_by_no(req, res) {
    console.log("GET NO");
    try {
      const flight_no = req.params.f_no;
      const flight = await Flights.get_flight_by_no(flight_no);

      if (flight) {
        res.status(200).json({ success: true, flights: flight });
      } else {
        res
          .status(404)
          .json({ success: false, message: "El vuelo no fue encontrado" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async show_flight_by_id(req, res) {
    console.log("GET ID");
    try {
      const flight_id = req.params.f_id;
      const flight = await Flights.get_flight_by_id(flight_id);

      if (flight) {
        res.status(200).json({ success: true, flights: flight });
      } else {
        res
          .status(404)
          .json({ success: false, message: "El vuelo no fue encontrado" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async create_flights(req, res) {
    console.log("POST");
    try {
      const flights = await Flights.post_flights(req.body);
      res.status(201).json({ success: true, flights: flights });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async update_flights(req, res) {
    console.log("PUT");
    try {
      const flight_id = req.params.f_id;
      const flights = await Flights.put_flights(req.body, flight_id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async delete_flight_by_id(req, res) {
    console.log("DELETE");
    try {
      const flight_id = req.params.f_id;
      const flight = await Flights.delete_flight_by_id(flight_id);

      if (flight) {
        res.status(204).send();
      } else {
        res
          .status(404)
          .json({ success: false, message: "El vuelo no fue encontrado" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async show_airports(req, res) {
    try {
      const airports = await Flights.get_airports();
      res.json({ success: true, airports: airports });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Mostrar todos los aviones
  static async show_aircrafts(req, res) {
    try {
      const aircrafts = await Flights.get_aircrafts();
      res.json({ success: true, aircrafts: aircrafts });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
