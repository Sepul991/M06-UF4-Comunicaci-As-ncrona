import { Router } from "express";
import { TicketsController } from "../controlador/TicketsController.js";

export const deleteRoutes = Router();

deleteRoutes.delete("/delBooking/:id", TicketsController.del_bookings);
deleteRoutes.delete("/delTicket/:id", TicketsController.del_tickets);
// deleteRoutes.delete("/delTicket/:id", (req, res) => {
//     console.log(req);
// });
