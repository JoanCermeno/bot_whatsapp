const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");
// Create a new client instance
const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  authStrategy: new LocalAuth(),
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Client is ready!");

  // si el json con los contactos no existe lo generamos

  const nombreArchivo = "contactos.json"; // Nombre del archivo que quieres verificar

  // Obtener la ruta absoluta del archivo
  const rutaArchivo = path.join(__dirname, nombreArchivo);

  // Verificar si el archivo existe
  fs.access(rutaArchivo, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`El archivo ${nombreArchivo} no existe.`);
      // obteniendo una lista copleta de mis contactos
      client
        .getContacts()
        .then((listContact) => {
          // Create file whit all contacts
          const contactosFormateados = listContact.map((contact) => {
            if (contact.isUser == true) {
              let contacto_reducido = {
                id: contact.id,
                numero: contact.number,
                name: contact.name,
                pushname: contact.pushname,
                shorname: contact.shortName,
                isUser: contact.isUser,
              };

              return contacto_reducido;
            } else {
              console.log(
                "Se detecto un grupo, no se agrego a la lista de contacto"
              );
            }
          });

          fs.writeFile(
            "contactos.json",
            JSON.stringify(contactosFormateados),
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Contactos, creados y exportados");
                // mandamos a llamar a la conexion de la base de datos
                require("./lib/connection_db");
              }
            }
          );
        })
        .catch((err) => err);
    } else {
      console.log(`El archivo ${nombreArchivo} existe.`);
      //Pasamos a conectar con la base de datos... para ingresar los numeros de telefono
      require("./lib/connection_db");
    }
  });
});

// When the client received QR-Code
client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

// Start your client
client.initialize();

module.exports = client;
