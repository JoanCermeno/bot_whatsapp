const { Client, LocalAuth } = require("whatsapp-web.js");
//const { insertarContactos } = require("./lib/connection_db");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");

const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  authStrategy: new LocalAuth(),
});

client.once("ready", () => {
  console.log("conetion readdy!");
  // obteniendo una lista copleta de los contactos del cliente conectado con el metodo getContact
  client
    .getContacts()
    .then((listContact) => {
      // Filtrar las propiedades necesarias y mapear los objetos a un nuevo formato
      const contactosFiltrados = listContact
        .map((contacto) => {
          if (
            contacto.isMyContact == false ||
            contacto.isUser == false ||
            contacto.number == undefined ||
            contacto.name == undefined ||
            contacto.number == null ||
            contacto.name == null
          ) {
            console.log(
              "Los grupos y los contactos raros No sera agregados a la db"
            );

            return undefined;
          } else {
            return {
              wid: contacto.id._serialized,
              nombre: contacto.name,
              shortName: contacto.shortName,
              w_number_tlf: contacto.number,
            };
          }
        })
        .filter((contacto) => contacto !== null); // Filtra los elementos null
      // Ahora mandamos estos registros a la base de datos, a la tabla de clientes
      console.log("Cargando contactos a la db...");

      fs.writeFile(
        "contactos.json",
        JSON.stringify(contactosFiltrados),
        (err) => {
          if (err) {
            console.log("Error al generar el archivo");
          } else {
            console.log("Registro exportado con exito");
          }
        }
      );

      return 1;

      insertarContactos(contactosFiltrados)
        .then((exito) => {
          if (exito) {
            console.log("Los contactos se han insertado correctamente.");
          } else {
            console.log("Hubo un error al insertar los contactos.");
          }
        })
        .catch((error) => {
          console.error("Error al insertar contactos:", error);
        });
    })
    .catch((err) => console.log(err));
});

// When the client received QR-Code
client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

client.initialize();

module.exports = client;
