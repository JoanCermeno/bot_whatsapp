const fs = require("fs");

let allContact = { id: 12, nombre: "asjdoasd" };
allContact = JSON.stringify(allContact);

fs.writeFile("allContacts.txt", allContact, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("Lista de contactos creada!");
});
