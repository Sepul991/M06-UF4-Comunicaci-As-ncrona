import { Router } from "express";
import { Controller } from "../controlador/Controller.js";
import { TicketsController } from "../controlador/TicketsController.js";
export const router = Router();

router.get("/airports", Controller.show_airports);

router.get("/tickets", TicketsController.show_tickets);
