import express from "express";
import {
    createPuntuacion,
    getPuntuaciones,
    getPuntuacionById,
    updatePuntuacion,
    deletePuntuacion
} from "../controllers/PuntuacionControllers.js";

const router = express.Router();

// Rutas puntuaciones
router.post("/puntuaciones", createPuntuacion); 
router.get("/puntuaciones", getPuntuaciones); 
router.get("/puntuaciones/:id", getPuntuacionById); 
router.put("/puntuaciones/:id", updatePuntuacion); 
router.delete("/puntuaciones/:id", deletePuntuacion); 

export default router;
