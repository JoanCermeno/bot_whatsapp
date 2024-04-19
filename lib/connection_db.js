require("dotenv").config();
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

// Verificar la conexión
knex
  .raw("SELECT 1+1 as resultado")
  .then((result) => {
    console.log("Conexion establecida con exito!");
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
  });

//Fucnion insertar contactos!
function insertarContactos(contactos) {
  return knex("clientes")
    .insert(contactos)
    .then(() => {
      console.log("Registros insertados correctamente.");
      return true;
    })
    .catch((error) => {
      console.error("Error al insertar registros:", error);
      return false;
    });
}

module.exports = { insertarContactos };
