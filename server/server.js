const http = require("http");
const host = "localhost";
const port = 8888;
const interfaces = require('os').networkInterfaces();

// Express 
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

// Socket.io
const socketServer = require('socket.io');

// MongoDb
const mongoApi = require('./mongoApi');
const mongoUrl = "mongodb://localhost:27017/";
const dbName = "trident";
const cardCollection = "cards";
const logCollection = "logs";
const db = new mongoApi(mongoUrl, dbName);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Origin", "*");   
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app).listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  Object.keys(interfaces).forEach(function (ifname) {
    var alias = 0;
  
    interfaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
  
      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
      }
      ++alias;
    });
  });
});

const io = socketServer(server);


app.get('/card/catalog', (req, res) => {
  console.log("getting catalog....");
  const params = [{}, {}, 5];
  const connection = db.dbConnection(db.dbQuery, cardCollection, params);
  connection.then(
    (result) => { res.send(result) }, 
    (err) => { 
      console.log(`error connecting to mongodb: ${err}`); 
      throw err; 
    }
  );
});

app.put('/card', (req, res) => {
  console.log("about to insert");
  const card = req.body.card;
  console.log(card);
  if(card) {
    const connection = db.dbConnection(db.dbInsert, cardCollection, [card]);
    connection.then(
      (result) => { res.send(result) }, 
      (err) => { 
        console.log(`error connecting to mongodb: ${err}`);
        throw err; 
      }
    );
  }
});
