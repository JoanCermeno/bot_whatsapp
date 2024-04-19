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
    console.log(result[0]);
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
  });
