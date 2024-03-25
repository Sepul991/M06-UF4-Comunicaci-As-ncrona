import { Router } from "express";
import { TicketsController } from "../controlador/TicketsController.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const view = dirname(__filename);

export const postRoutes = Router();

postRoutes.post("/postBooking", TicketsController.add_bookings);

postRoutes.put("/postTicket", TicketsController.add_tickets);

postRoutes.post("/editBooking", TicketsController.mod_bookings);

postRoutes.put("/editTickets", TicketsController.mod_tickets);
// postRoutes.post("/editTickets", (req, res) => {
//     //
//     console.log(req.body);
// });

// postRoutes.post("/editBooking", (req, res) => {
//     //
//     console.log(req.body);
// });
