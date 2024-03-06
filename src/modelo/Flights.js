import dbclient from "../ddbb/conexion.js";

export class Flights {
  static async get_flights() {
    const client = await dbclient();
    let flights = await client.query(
      `
      SELECT flight_no, scheduled_departure, scheduled_arrival, da.airport_name as departure, aa.airport_name as arrival, status, f.aircraft_code, ad.model, actual_departure, actual_arrival
      FROM Flights f
      JOIN Airports da ON (da.airport_code = f.departure_airport)
      JOIN Airports aa ON (aa.airport_code = f.arrival_airport)
      JOIN aircrafts_data ad ON (ad.aircraft_code = f.aircraft_code)
      ORDER BY flight_id DESC
      LIMIT 20;
      `
    );
    await client.end();
    return flights.rows;
  }

  static async get_airports() {
    const client = await dbclient();
    let airports = await client.query(
      `
      SELECT *
      FROM Airports 
      LIMIT 20;
      `
    );
    await client.end();
    return airports.rows;
  }

  static async get_aircrafts() {
    const client = await dbclient();
    let aircrafts = await client.query(
      `
      SELECT *
      FROM aircrafts
      LIMIT 20;
      `
    );
    await client.end();
    return aircrafts.rows;
  }
}
