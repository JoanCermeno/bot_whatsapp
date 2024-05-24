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

// Función modificada para manejar la respuesta del servidor
const login = (req, res) => {
  res.send({
    message: "Obten tu codigo QR por medio de la siguiente ruta.",
    wsUrl: `ws://localhost:${puerto}`,
  });
};

wss.on("connection", (socket) => {
  console.log("Cliente solicitando el codigo qr...");
  socket.send("Su codigo qr sera generado en breve, por favor espere.");

  client.on("qr", (qr) => {
    console.log("QR GENERADO! -> ", qr); // Opcional: Imprime el QR para depuración
    socket.send(qr.toString());
  });

  socket.on("close", () => {
    console.log("Cliente desconectado");
  });

  socket.onerror = function () {
    console.log("Ocurrió un error");
  };

  socket.onmessage = function () {
    console.log("Me enviaron algo");
  };
});

client.once("ready", () => {
  console.log("conetion con el whastapp del cliente establecida!!");
});

client.initialize();

module.exports = { login };
