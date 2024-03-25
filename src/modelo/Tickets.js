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
                        limit 50;
        `);
        // console.log(tickets);
        await client.end();
        return tickets.rows;
    }

    static async get_bookings(saltar) {
        const client = await dbclient();
        let bookings = await client.query(
            //
            "select * from bookings order by book_ref asc offset $1 limit 50",
            [saltar],
        );
        await client.end();
        return bookings.rows;
    }

    //
    static async add_ticket(obj) {
        try {
            const client = await dbclient();
            await client.query(
                "INSERT INTO tickets (ticket_no, book_ref, passenger_id, passenger_name, contact_data) VALUES ($1, $2, $3, $4,$5)",
                [
                    obj.nTicket,
                    obj.nReserva,
                    obj.idPassenger,
                    obj.name,
                    obj.contact_data,
                ],
            );
            return result.rows[0]; // Devolver el resultado de la inserción si es necesario
        } catch (error) {
            console.error(
                "Error al agregar reserva en la base de datos:",
                error,
            );
            throw error;
        }
    }

    static async get_bookRefs() {
        const client = await dbclient();
        let bookRef = await client.query("select book_ref from tickets");
        await client.end();
        return bookRef.rows;
    }

    static async del_booking(book_ref) {
        try {
            const client = await dbclient();
            // Ejecutar la consulta DELETE con el parámetro proporcionado
            const resultado = await client.query(
                "DELETE FROM bookings WHERE book_ref = $1",
                [book_ref],
            );

            // Verificar si se eliminó correctamente
            if (resultado.rowCount > 0) {
                console.log("Elemento eliminado correctamente");
                return resultado.rows[0]; // Devolver el primer elemento eliminado
            } else {
                console.log("No se encontró ningún elemento para eliminar");
                return null; // No se eliminó ningún elemento
            }
        } catch (error) {
            console.error(
                "Error al eliminar reserva en la base de datos:",
                error,
            );
            throw error;
        }
    }
    static async del_ticket(ticket_no) {
        try {
            const client = await dbclient();
            // Ejecutar la consulta DELETE con el parámetro proporcionado
            const resultado = await client.query(
                "DELETE FROM tickets WHERE ticket_no = $1",
                [ticket_no],
            );

            // Verificar si se eliminó correctamente
            if (resultado.rowCount > 0) {
                console.log("Elemento eliminado correctamente");
                return resultado.rows[0]; // Devolver el primer elemento eliminado
            } else {
                console.log("No se encontró ningún elemento para eliminar");
                return null; // No se eliminó ningún elemento
            }
        } catch (error) {
            console.error(
                "Error al eliminar reserva en la base de datos:",
                error,
            );
            throw error;
        }
    }

    static async add_booking(obj) {
        //
        try {
            const client = await dbclient();
            const result = await client.query(
                "INSERT INTO bookings (book_ref, book_date, total_amount) VALUES ($1, $2, $3)",
                [obj.nReserva, obj.dateBook, obj.totalAmount],
            );
            return result.rows[0]; // Devolver el resultado de la inserción si es necesario
        } catch (error) {
            console.error(
                "Error al agregar reserva en la base de datos:",
                error,
            );
            throw error;
        }
    }

    static async getInfo_booking(id) {
        //
        try {
            //
            const client = await dbclient();
            const result = await client.query(
                "select * from bookings where book_ref = $1 ",
                [id],
            );
            // console.log(result.rows);
            return result.rows;
        } catch (error) {
            console.error(
                "Error al recuperar la información de la en la base de datos:",
                error,
            );
            throw error;
        }
    }
    static async getInfo_booking(id) {
        //
        try {
            //
            const client = await dbclient();
            const result = await client.query(
                "select * from bookings where book_ref = $1 ",
                [id],
            );
            // console.log(result.rows);
            return result.rows;
        } catch (error) {
            console.error(
                "Error al recuperar la información de la en la base de datos:",
                error,
            );
            throw error;
        }
    }
    static async getInfo_ticket(id) {
        //
        try {
            //
            const client = await dbclient();
            const result = await client.query(
                "select * from tickets where ticket_no = $1 ",
                [id],
            );
            // console.log(result.rows);
            return result.rows;
        } catch (error) {
            console.error(
                "Error al recuperar la información de la en la base de datos:",
                error,
            );
            throw error;
        }
    }

    static async mod_booking(obj) {
        try {
            console.log(obj);
            const client = await dbclient();
            const result = await client.query(
                "UPDATE bookings SET book_date = $1::timestamp, total_amount = $2 WHERE book_ref = $3;",
                [obj.dateBook, obj.totalAmount, obj.nReserva],
            );

            if (result.rowCount > 0) {
                const updatedRow = result.rows[0]; // fila actualizada
                return {
                    success: true,
                    message: "La reserva se actualizó correctamente",
                    updatedRow: updatedRow,
                };
            } else {
                return {
                    success: false,
                    message: "No se pudo encontrar la reserva para actualizar",
                };
            }
        } catch (error) {
            console.error(
                "Error al agregar reserva en la base de datos:",
                error,
            );
            throw error;
        }
    }

    // TODO: implement-> Esta versión me da error por que hay muchos tickets

    static async mod_ticket(obj) {
        try {
            // const contactData = {
            //     email: obj.emailPassenger,
            // };
            console.log(obj.nTicket);
            console.log(obj.idPassenger);
            console.log(obj.name);
            console.log(obj.nR);
            const client = await dbclient();
            const result = await client.query(
                "UPDATE tickets SET  passenger_id = $1, passenger_name = $2 WHERE book_ref = $3;",
                [obj.idPassenger, obj.name, obj.nR],
            );

            if (result.rowCount > 0) {
                return {
                    success: true,
                    message: "La reserva se actualizó correctamente",
                };
            } else {
                return {
                    success: false,
                    message: "No se pudo encontrar la reserva para actualizar",
                };
            }
        } catch (error) {
            console.error(
                "Error al agregar reserva en la base de datos:",
                error,
            );
            throw error;
        }
    }
}
