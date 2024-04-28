const express = require("express");
const router = express.Router();
const clienteController = require("./controllers/clienteController");
const apiDoc = require("./controllers/apiDoc");
// ruta welcome
router.get("/", apiDoc.welcome);

// Rutas para los clientes
router.get("/clientes", clienteController.getAllClientes);
router.get("/clientes/:id", clienteController.getClienteById);
router.post("/clientes", clienteController.createCliente);
router.put("/clientes/:id", clienteController.updateCliente);
router.delete("/clientes/:id", clienteController.deleteCliente);

module.exports = router;
