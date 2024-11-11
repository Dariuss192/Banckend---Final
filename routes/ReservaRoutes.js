import express from "express";
import {
    createReserva,
    getReservas,
    getReservaById,
    updateReserva,
    deleteReserva
} from "../controllers/ReservaControllers.js";

const router = express.Router();

// Rutas reservas
router.post("/reservas", createReserva); 
router.get("/reservas", getReservas); 
router.get("/reservas/:id", getReservaById); 
router.put("/reservas/:id", updateReserva); 
router.delete("/reservas/:id", deleteReserva); 

export default router;
