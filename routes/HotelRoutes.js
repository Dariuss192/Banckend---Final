import express from "express";
import {
    createHotel,
    getHoteles,
    getHotelById,
    updateHotel,
    deleteHotel
} from "../controllers/HotelControllers.js";

const router = express.Router();

// Rutas hoteles
router.post("/hoteles", createHotel); 
router.get("/hoteles", getHoteles); 
router.get("/hoteles/:id", getHotelById); 
router.put("/hoteles/:id", updateHotel); 
router.delete("/hoteles/:id", deleteHotel); 

export default router;
