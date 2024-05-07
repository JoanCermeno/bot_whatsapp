const { Client, LocalAuth } = require("whatsapp-web.js");

const qrcode = require("qrcode-terminal");

const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  authStrategy: new LocalAuth(),
});

client.once("ready", () => {
  console.log("conetion con el whastapp del cliente establecida!!");
});

// When the client received QR-Code
client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

client.on("message_create", (message) => {
  if (message.body === "/joan" || message.body === "/Joan") {
    // send back "pong" to the chat the message was sent in
    client.sendMessage(
      message.from,
      `Jajaj Si vale soy un programa que aun estoy muerto, por ahora no puedo hacer muchas vainas. Porque seoy medio bruto
    pero joan me esta programando para adquirir nuevas habilidades.`
    );
  }
  console.log(message.body);
});

client.initialize();

module.exports = client;
