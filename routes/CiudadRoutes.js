import express from "express";
import {
    createCiudad,
    getCiudades,
    getCiudadById,
    updateCiudad,
    deleteCiudad
} from "../controllers/CiudadControllers.js";

const router = express.Router();

// Rutas ciudades
router.post("/ciudades", createCiudad); 
router.get("/ciudades", getCiudades); 
router.get("/ciudades/:id", getCiudadById); 
router.put("/ciudades/:id", updateCiudad); 
router.delete("/ciudades/:id", deleteCiudad); 

export default router;
