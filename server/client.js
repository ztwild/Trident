const axios = require('axios');
const readline = require('readline');

const port = 8888;
const hostname = "localhost";
const url = `http://${hostname}:${port}`;

const card = {
  name: "mock monster",
  url: "mock url", 
  deploy: 10,
  attack: 100,
  defense: 50,
  hp: 500,
  move: 3,
  armorSlots: 2,
  weaponSlots: 1
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', line => {
  axios.get(`${url}/card/catalog`)
  .then(response => {
    console.log("fine");
    console.log(response.data);
  })
  .catch(error => {
    console.log("Error");
    console.log(error);
  });
});
