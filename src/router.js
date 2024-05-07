const express = require("express");
const router = express.Router();
const clienteController = require("./controllers/clienteController");
const apiDoc = require("./controllers/apiDoc");
const recordatorioController = require("./controllers/recordatorios");
// ruta welcome
router.get("/", apiDoc.welcome);

// Rutas para los clientes
router.get("/clientes", clienteController.getAllClientes);
router.get("/clientes-activos", clienteController.getClientesActivos);
router.get("/clientes/:id", clienteController.getClienteById);
router.post("/clientes", clienteController.createCliente);
router.put("/clientes", clienteController.updateProximoPagoDiasRestantes);
router.put("/clientes/:id", clienteController.updateCliente);
router.delete("/clientes/:id", clienteController.deleteCliente);

//Ruta para los notificaciones

//rutas para el configurar el cron taks
router.get("/recordatorios", recordatorioController.getRecordatorios);
router.post(
  "/enviar-recordatorio/cliente/:id_cliente",
  recordatorioController.enviarRecordatorio
);
module.exports = router;
