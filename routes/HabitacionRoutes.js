import express from "express";
import {
    createHabitacion,
    getHabitaciones,
    getHabitacionById,
    updateHabitacion,
    deleteHabitacion
} from "../controllers/HabitacionControllers.js";

const router = express.Router();

// Rutas habitaciones
router.post("/habitaciones", createHabitacion);
router.get("/habitaciones", getHabitaciones);
router.get("/habitaciones/:id", getHabitacionById); 
router.put("/habitaciones/:id", updateHabitacion); 
router.delete("/habitaciones/:id", deleteHabitacion); 

export default router;
