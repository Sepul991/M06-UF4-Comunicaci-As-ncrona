import { Router } from "express";
import { TicketsController } from "../controlador/TicketsController.js";
import dbclient from "../ddbb/conexion.js";

export const postRoutes = Router();
// postRoutes.post("/add", async (req, res) => {
//     try {
//         // Verificar si hay datos en el cuerpo de la solicitud
//         if (!req.body || Object.keys(req.body).length === 0) {
//             console.log(req.body);
//             return res.status(400).json({
//                 message:
//                     "No se han proporcionado datos en el cuerpo de la solicitud.",
//             });
//         }
//         console.log(req.body);
//         console.log(req.body.emailPassenger);

//         const client = await dbclient();
//         const { nTicket, nReserva, idPassenger, name } = req.body;
//         const contactData = {
//             emails: [req.body.emailPassenger],
//         };

//         // Realizar la inserción en la base de datos
//         await client.query(
//             "INSERT INTO tickets (ticket_no, book_ref, passenger_id, passenger_name, contact_data) VALUES ($1, $2, $3, $4, $5)",
//             [nTicket, nReserva, idPassenger, name, contactData],
//         );

//         res.redirect("/");
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
postRoutes.post("/add", async (req, res) => {
    try {
        // Verificar si hay datos en el cuerpo de la solicitud
        if (!req.body || Object.keys(req.body).length === 0) {
            console.log(req.body);
            return res.status(400).json({
                message:
                    "No se han proporcionado datos en el cuerpo de la solicitud.",
            });
        }
        console.log(req.body);
        console.log(req.body.emailPassenger);

        const client = await dbclient();
        const { nReserva, dateBook, totalAmount } = req.body;

        // Realizar la inserción en la base de datos
        await client.query(
            "INSERT INTO bookings (book_ref, book_date, total_amount) VALUES ($1, $2, $3)",
            [nReserva, dateBook, totalAmount],
        );

        res.redirect("/");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
