import { Router } from "express";
import { Controller } from "../controlador/Controller.js";
import { FController } from "../controlador/Flight_Controller.js";
export const router = Router();

// get Flights
router.get("/showFlights", FController.show_flights);

// get Airports
router.get("/showAirports", FController.show_airports);

// get Aircrafts
router.get("/showAircrafts", FController.show_aircrafts);
