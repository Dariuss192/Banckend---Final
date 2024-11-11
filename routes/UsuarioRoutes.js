import express from "express";
import {
    createUsuario,
    getUsuarios,
    getUsuarioById,
    deleteUsuario,
    loginUsuario,
    updateUsuario
} from "../controllers/UsuarioControllers.js";

const router = express.Router();

// Rutas usuarios
router.post("/usuarios", createUsuario);
router.get("/usuarios", getUsuarios); 
router.get("/usuarios/:id", getUsuarioById); 
router.put("/usuarios/:id", updateUsuario);
router.delete("/usuarios/:id", deleteUsuario);
router.post("/login", loginUsuario);

export default router;
