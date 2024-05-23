const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const WebSocket = require("ws");
const puerto = process.env.WSPORT || 8081;

// Crear un nuevo servidor WebSocket para poder enviar el qr automaticamente
const wss = new WebSocket.Server({ port: puerto });

const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  authStrategy: new LocalAuth(),
});

let qrCodeData = ""; // Variable para almacenar el QR code temporalmente

wss.on("connection", (socket) => {
  console.log("Cliente conectado");
  socket.send("En breve te enviaremos el qr de autenticacion");

  client.on("qr", (qr) => {
    qrCodeData = qr.toString();
    console.log("QR RECEIVED ", qrCodeData); // Opcional: Imprime el QR para depuración
    socket.send(qrCodeData);
  });

  socket.on("close", () => {
    console.log("Cliente desconectado");
  });

  socket.onerror = function () {
    console.log("Ocurrió un error");
  };
});

client.once("ready", () => {
  console.log("conetion con el whastapp del cliente establecida!!");
});

// Función modificada para manejar la respuesta del servidor
const login = (req, res) => {
  if (qrCodeData != "") {
    res.send({
      message: "Obten tu codigo QR por medio de la siguiente ruta.",
      wsUrl: `ws://localhost:${pory}`,
    });
  } else {
    res.status(102).send({ mensaje: `The QR is empty... Try again later` });
  }
};

client.initialize();

module.exports = { login };
