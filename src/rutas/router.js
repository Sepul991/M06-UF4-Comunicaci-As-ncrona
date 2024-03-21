import { Router } from "express";
import { Controller } from "../controlador/Controller.js";
import { FController } from "../controlador/flight_controller.js";
export const router = Router();

// get Flights
router.get("/flight", FController.show_flights);

router.get("/flight/no/:f_no", FController.show_flight_by_no);

router.get("/flight/id/:f_id", FController.show_flight_by_id);

// post Flights
router.post("/flight", FController.create_flights);

// put Flights
router.put("/flight/:f_id", FController.update_flights);

// delete Flights
router.delete("/flight/:f_id", FController.delete_flight_by_id);

// get Airports
router.get("/airport", FController.show_airports);

// get Aircrafts
router.get("/aircraft", FController.show_aircrafts);
