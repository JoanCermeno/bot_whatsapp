const { Client, LocalAuth, NoAuth } = require("whatsapp-web.js");
const { insertarContactos } = require("./lib/connection_db");
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
      const contactosFiltrados = [];
      listContact.forEach((contacto) => {
        if (
          contacto.isMyContact == false ||
          contacto.isUser == false ||
          contacto.number == undefined ||
          contacto.name == undefined ||
          contacto.number == null ||
          contacto.name == null ||
          contacto == null
        ) {
          console.log("Estos contactos no son clientes");
        } else {
          contactosFiltrados.push({
            wid: contacto.id._serialized,
            nombre: contacto.name,
            w_number_tlf: contacto.number,
            pushName: contacto.pushname,
          });
        }
      });
      // Ahora mandamos estos registros a la base de datos, a la tabla de clientes
      console.log("Cargando contactos a la db...");

      insertarContactos(contactosFiltrados)
        .then((exito) => {
          if (exito) {
            console.log("Los contactos se han insertado correctamente.");
            // mandamos al menu de opciones
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
