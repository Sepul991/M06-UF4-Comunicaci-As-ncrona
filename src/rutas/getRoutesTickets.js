import { Router } from "express";
import { TicketsController } from "../controlador/TicketsController.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

export const getRoutes = Router();

const __filename = fileURLToPath(import.meta.url);
const view = dirname(__filename);

getRoutes.get("/", (req, res) => {
    //
    res.sendFile(join(view, "../view/tickets.html"));
});
// get tickets
getRoutes.get("/tickets", TicketsController.show_tickets);

// get bookings
getRoutes.get("/booking", TicketsController.show_bookings);

// get newTickets
getRoutes.get("/new", (req, res) => {
    //
    res.sendFile(join(view, "../view/newTicket.html"));
});
