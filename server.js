// Server 
const http = require("http");
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const host = "localhost";
const port = 8888;

// MongoDb
const mongoApi = require('./mongoApi');
const mongoUrl = "mongodb://localhost:27017/";
const dbName = "trident";
const cardCollection = "cards";
const logCollection = "logs";
const db = new mongoApi(mongoUrl, dbName);


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

http.createServer(app).listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});


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

// app.put('/card', (req, res) => {
//   console.log("about to insert");
//   const card = req.body.card;
//   console.log(card);
//   if(card) {
//     const connection = db.dbConnection(db.dbQuery, cardCollection, params);
//     connection.then(
//       (result) => { res.send(result) }, 
//       (err) => { console.log(`error connecting to mongodb: ${err}`) }
//     );
//     MongoClient.connect(`${urlMongo}`, (err, client) => {
//       if(err) {
//         console.log("error connecting to mongodb");
//         res.send(err);
//       }
//       client.db(dbName).collection(collection).insertOne(card);
//       client.close();
//       console.log("insert success");
//       res.send("success");
//     });
//   }
// });
