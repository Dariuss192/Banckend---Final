import express from "express";
import {
    createPrecioPorCiudad,
    getPreciosPorCiudad,
    getPrecioPorCiudadById,
    updatePrecioPorCiudad,
    deletePrecioPorCiudad
} from "../controllers/PrecioCiudadControllers.js";

const router = express.Router();

// Rutas precios por ciudad
router.post("/precios", createPrecioPorCiudad); 
router.get("/precios", getPreciosPorCiudad); 
router.get("/precios/:id", getPrecioPorCiudadById); 
router.put("/precios/:id", updatePrecioPorCiudad); 
router.delete("/precios/:id", deletePrecioPorCiudad); 

export default router;
