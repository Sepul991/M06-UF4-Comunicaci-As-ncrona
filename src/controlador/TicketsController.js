import { Tickets } from "../modelo/Tickets.js";

export class TicketsController {
    static async show_tickets(req, res) {
        let tickets = await Tickets.get_tickets();
        res.send(tickets);
    }
}
