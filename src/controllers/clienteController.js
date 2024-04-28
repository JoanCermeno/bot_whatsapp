// Importa el modelo del cliente si es necesario
const Cliente = require("../models/Cliente");

// Controlador para manejar las solicitudes relacionadas con los clientes
const clienteController = {
  getAllClientes: async (req, res) => {
    // Mandamos a llamar a todos los clientes de la db
    const clientes = await Cliente.obtenerClientes();
    res.send(clientes);
  },

  getClienteById: async (req, res) => {
    // Lógica para obtener un cliente por su ID
    const clienteFound = await Cliente.obtenerClientePorId(req.params.id);
    res.send(clienteFound);
  },

  createCliente: (req, res) => {
    // Lógica para crear un nuevo cliente
    res.send("Crear un nuevo cliente");
  },

  updateCliente: (req, res) => {
    // Lógica para actualizar un cliente existente
    res.send(`Actualizar cliente con ID ${req.params.id}`);
  },

  deleteCliente: (req, res) => {
    // Lógica para eliminar un cliente
    res.send(`Eliminar cliente con ID ${req.params.id}`);
  },
};

module.exports = clienteController;
