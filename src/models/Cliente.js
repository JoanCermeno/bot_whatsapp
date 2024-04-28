const { knex } = require("../../lib/connection_db");

// Función para obtener todos los clientes
async function obtenerClientes() {
  try {
    const clientes = await knex("clientes").select("*");
    return clientes;
  } catch (error) {
    throw error;
  }
}

// Función para obtener un cliente por su ID
async function obtenerClientePorId(clienteId) {
  try {
    const cliente = await knex("clientes").where({ id: clienteId }).first();
    return cliente;
  } catch (error) {
    throw error;
  }
}

// Exporta las funciones para que puedan ser utilizadas en otros archivos
module.exports = {
  obtenerClientes,
  obtenerClientePorId,
  // Puedes agregar más funciones aquí según tus necesidades
};
