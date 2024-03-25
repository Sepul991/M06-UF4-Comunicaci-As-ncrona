import { Router } from "express";
import { TicketsController } from "../controlador/TicketsController.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { get } from "http";

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

// get newBooking
getRoutes.get("/newBooking", (req, res) => {
    //
    res.sendFile(join(view, "../view/newBooking.html"));
});

// get newTickets
getRoutes.get("/newTicket", (req, res) => {
    //
    res.sendFile(join(view, "../view/newTickets.html"));
});

getRoutes.get("/editBook/:id", TicketsController.getInfo_bookings);
// getRoutes.get("/edit/:id", (req, res) => {
//     console.log(req.params.id);
// });
getRoutes.get("/editTicket/:id", TicketsController.getInfo_tickets);
// getRoutes.get("/editTicket/:id", (req, res) => {
//     //
//     console.log(req.params.id);
// });
