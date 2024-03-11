import dbclient from "../ddbb/conexion.js";

// Realizar la consulta a la base de datos. Se encarga de traer los datos
export class Tickets {
    static async get_tickets() {
        const client = await dbclient();
        let tickets = await client.query(`
                    SELECT 
                        ticket_no,
                        book_ref,
                        passenger_id,
                        passenger_name,
                        (contact_data->>'phone') || 
                        (CASE WHEN jsonb_typeof(contact_data->'phone2') = 'string' THEN ', ' || (contact_data->>'phone2') ELSE '' END) AS telefono_1,
                        COALESCE(contact_data->>'email', 'sin informacion') AS email
                    FROM 
                        tickets
                    LIMIT 10;
        `);
        // console.log(tickets);
        await client.end();
        return tickets.rows;
    }

    static async get_bookings() {
        const client = await dbclient();
        let bookings = await client.query(
            //
            "select * from bookings LIMIT 10",
        );
        await client.end();
        return bookings.rows;
    }
}
