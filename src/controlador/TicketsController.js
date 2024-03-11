import { Tickets } from "../modelo/Tickets.js";

export class TicketsController {
    //
    static async show_tickets(req, res) {
        let tickets = await Tickets.get_tickets();
        res.send(tickets);
    }
    //
    static async show_bookings(req, res) {
        let booking = await Tickets.get_bookings();
        res.send(booking);
    }

    // static async get_newTickets(req, res) {
    //     //
    //     let nwTicket = await Tickets.get_newTicket();
    //     res.send(nwTicket);
    // }
}
