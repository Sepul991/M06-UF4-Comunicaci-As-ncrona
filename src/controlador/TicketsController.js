import { Tickets } from "../modelo/Tickets.js";

export class TicketsController {
    //
    static async show_tickets(req, res) {
        let tickets = await Tickets.get_tickets();
        res.send(tickets);
    }
    //
    static async show_bookings(req, res) {
        let saltar = req.query.saltar;
        let booking = await Tickets.get_bookings(saltar);
        res.send(booking);
    }

    //

    static async get_bookRef(req, res) {
        let bookRef = await Tickets.get_bookRefs();
        res.send(bookRef);
    }

    static async del_bookings(req, res) {
        //

        try {
            let ref = req.params.id;
            // console.log(ref);
            let delBooking = await Tickets.del_booking(ref);
            // res.send(delBooking);
        } catch (error) {
            console.error("Error al borrar la reserva:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    static async del_tickets(req, res) {
        //
        let ref = req.params.id;
        console.log(ref);
        let delTicket = await Tickets.del_ticket(ref);
        res.send(delTicket);
    }

    static async add_bookings(req, res) {
        //
        try {
            const newBooking = {
                nReserva: req.body.nReserva,
                dateBook: req.body.dateBook,
                totalAmount: req.body.totalAmount,
            };
            const addBookingResult = await Tickets.add_booking(newBooking);
            res.status(201).json({
                message: "Reserva agregada exitosamente",
                data: addBookingResult,
            });
        } catch (error) {
            console.error("Error al agregar reserva:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    static async add_tickets(req, res) {
        //
        try {
            //
            const newTicket = {
                nReserva: req.body.nReserva,
                nTicket: req.body.nTicket,
                idPassenger: req.body.idPassenger,
                name: req.body.name,
                emailPassenger: req.body.emailPassenger,
            };
            let addTicketResult = await Tickets.add_ticket(newTicket);
            res.status(201).json({
                message: "Ticket agregado exitosamente",
                data: addTicketResult,
            });
        } catch (error) {
            console.error("Error al agregar reserva:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    static async getInfo_bookings(req, res) {
        //
        try {
            //
            let infoBooking = req.params.id;
            console.log(infoBooking);
            let getInfoBooking = await Tickets.getInfo_booking(infoBooking);
            res.send(getInfoBooking);
            // console.log(getInfoBooking);
        } catch (error) {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
    static async getInfo_tickets(req, res) {
        //
        try {
            //
            let infoTicket = req.params.id;
            let getInfoTicket = await Tickets.getInfo_ticket(infoTicket);
            res.send(getInfoTicket);
            // console.log(getInfoTicket);
        } catch (error) {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    static async mod_bookings(req, res) {
        try {
            console.log(
                req.body.dateBook +
                    " //" +
                    req.body.totalAmount +
                    " //" +
                    req.body.nReserva,
            );
            const infoModBooking = {
                nReserva: req.body.nReserva,
                dateBook: req.body.dateBook,
                totalAmount: req.body.totalAmount,
            };
            let modBooking = await Tickets.mod_booking(infoModBooking);
            if (modBooking.success) {
                // Si la reserva se actualiza correctamente, envía un mensaje y un estado 200 (OK)
                res.status(200).json({
                    success: true,
                    message: modBooking.message,
                });
            } else {
                // Si la reserva no se encuentra para actualizar, envía un estado 404 (No encontrado)
                res.status(404).json({
                    success: false,
                    message: modTicket.message,
                });
            }
        } catch (error) {
            console.error("Error al guardar el nuevo de la reserva:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
    static async mod_tickets(req, res) {
        try {
            console.log(req.body);
            const infoModTicket = {
                nR: req.body.nR,
                nTicket: req.body.nTicket,
                name: req.body.name,
                idPassenger: req.body.idPassenger,
            };
            let modTicket = await Tickets.mod_ticket(infoModTicket);

            console.log(modTicket);
            if (modTicket.success) {
                // Si la reserva se actualiza correctamente, envía un mensaje y un estado 200 (OK)
                res.status(200).json({
                    success: true,
                    message: modTicket.message,
                });
            } else {
                // Si la reserva no se encuentra para actualizar, envía un estado 404 (No encontrado)
                res.status(404).json({
                    success: false,
                    message: modTicket.message,
                });
            }
        } catch (error) {
            console.error("Error al guardar el nuevo de la reserva:", error);
            if (error.constraint === "tickets_pkey") {
                // Si el error es debido a una llave duplicada, envía un estado 409 (Conflicto) y un mensaje
                res.status(409).json({
                    success: false,
                    message:
                        "Ya existe una reserva con el mismo número de ticket.",
                });
            } else {
                // Si el error no es debido a una llave duplicada, envía un estado 500 (Error interno del servidor) y un mensaje genérico
                res.status(500).json({
                    success: false,
                    message: "Error interno del servidor",
                });
            }
        }
    }
}
