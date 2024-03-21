import dbclient from "../ddbb/conexion.js";

export class Flights {
  static async get_flights(skip, limit) {
    const client = await dbclient();

    let values = [skip, limit];

    let flights = await client.query(
      `
      SELECT flight_id, flight_no, scheduled_departure, scheduled_arrival, departure_airport, da.airport_name as departure, arrival_airport, aa.airport_name as arrival, status, f.aircraft_code, ad.model, actual_departure, actual_arrival
      FROM Flights f
      JOIN Airports da ON (da.airport_code = f.departure_airport)
      JOIN Airports aa ON (aa.airport_code = f.arrival_airport)
      JOIN aircrafts_data ad ON (ad.aircraft_code = f.aircraft_code)
      ORDER BY flight_id DESC
      OFFSET $1
      LIMIT $2;
      `,
      values
    );
    await client.end();
    return flights.rows;
  }

  static async get_flight_by_no(flightId) {
    const client = await dbclient();

    const flights = await client.query(
      `
      SELECT flight_id, flight_no, scheduled_departure, scheduled_arrival, departure_airport, da.airport_name as departure, arrival_airport, aa.airport_name as arrival, status, f.aircraft_code, ad.model, actual_departure, actual_arrival
      FROM Flights f
      JOIN Airports da ON (da.airport_code = f.departure_airport)
      JOIN Airports aa ON (aa.airport_code = f.arrival_airport)
      JOIN aircrafts_data ad ON (ad.aircraft_code = f.aircraft_code)
      where flight_no LIKE $1 || '%'
      ORDER BY flight_id DESC
      LIMIT 5000;
      `,
      [flightId]
    );

    console.log(flights);
    await client.end();
    return flights.rows;
  }

  static async get_flight_by_id(flightId) {
    const client = await dbclient();

    const flights = await client.query(
      `
      SELECT flight_id, flight_no, scheduled_departure, scheduled_arrival, departure_airport, da.airport_name as departure, arrival_airport, aa.airport_name as arrival, status, f.aircraft_code, ad.model, actual_departure, actual_arrival
      FROM Flights f
      JOIN Airports da ON (da.airport_code = f.departure_airport)
      JOIN Airports aa ON (aa.airport_code = f.arrival_airport)
      JOIN aircrafts_data ad ON (ad.aircraft_code = f.aircraft_code)
      WHERE flight_id = $1
      `,
      [flightId]
    );

    await client.end();
    return flights.rows;
  }

  static async post_flights(flightData) {
    const client = await dbclient();

    try {
      // Guarda els valors a les corresponents variables
      const {
        flight_no,
        scheduled_departure,
        scheduled_arrival,
        departure_airport,
        arrival_airport,
        status,
        aircraft_code,
        actual_departure,
        actual_arrival,
      } = flightData;

      // Extreu l'ultim id de la taula flights
      const last_id = await client.query(
        `
        SELECT flight_id + 1 AS id
        FROM flights
        ORDER BY flight_id DESC
        LIMIT 1
        `
      );

      const query = `
      INSERT INTO bookings.flights(
        flight_id, flight_no, scheduled_departure, scheduled_arrival, departure_airport, arrival_airport, status, aircraft_code, actual_departure, actual_arrival)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
      `;

      const values = [
        parseInt(last_id.rows[0].id), // entero
        String(flight_no), // carácter
        scheduled_departure ? new Date(scheduled_departure) : null, // marca de tiempo con zona horaria o null si no está definido
        scheduled_arrival ? new Date(scheduled_arrival) : null, // marca de tiempo con zona horaria o null si no está definido
        String(departure_airport), // carácter
        String(arrival_airport), // carácter
        status.substring(0, 20), // character varying (20)
        String(aircraft_code), // carácter
        actual_departure ? new Date(actual_departure) : null, // marca de tiempo con zona horaria o null si no está definido
        actual_arrival ? new Date(scheduled_arrival) : null, // marca de tiempo con zona horaria o null si no está definido
      ];

      const result = await client.query(query, values);

      console.log("Post Done");
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await client.end();
    }
  }

  static async put_flights(flightData, flight_id) {
    const client = await dbclient();

    try {
      // Guarda els valors a les corresponents variables
      const {
        flight_no,
        scheduled_departure,
        scheduled_arrival,
        departure_airport,
        arrival_airport,
        status,
        aircraft_code,
        actual_departure,
        actual_arrival,
      } = flightData;

      const query = `
      UPDATE bookings.flights
        SET flight_no=$2, scheduled_departure=$3, scheduled_arrival=$4, departure_airport=$5, arrival_airport=$6, status=$7, aircraft_code=$8, actual_departure=$9, actual_arrival=$10
        WHERE flight_id = $1;
      `;

      const values = [
        parseInt(flight_id), // entero
        String(flight_no), // carácter
        scheduled_departure ? new Date(scheduled_departure) : null, // marca de tiempo con zona horaria o null si no está definido
        scheduled_arrival ? new Date(scheduled_arrival) : null, // marca de tiempo con zona horaria o null si no está definido
        String(departure_airport), // carácter
        String(arrival_airport), // carácter
        status.substring(0, 20), // character varying (20)
        String(aircraft_code), // carácter
        actual_departure ? new Date(actual_departure) : null, // marca de tiempo con zona horaria o null si no está definido
        actual_arrival ? new Date(scheduled_arrival) : null, // marca de tiempo con zona horaria o null si no está definido
      ];

      const result = await client.query(query, values);
      console.log("Put Done");
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await client.end();
    }
  }

  static async delete_flight_by_id(flightId) {
    const client = await dbclient();

    const query = `
    DELETE FROM flights
    WHERE flight_id = $1
      `;

    const flights = await client.query(query, [flightId]);

    await client.end();
    return flights.rows;
  }

  static async get_airports() {
    const client = await dbclient();

    let airports = await client.query(
      `
      SELECT *
      FROM Airports;
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
      `
    );

    await client.end();
    return aircrafts.rows;
  }
}
