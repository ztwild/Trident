const mongod = require('mongodb');

const MongoClient = mongod.MongoClient
const url = "mongodb://localhost:27017/";
const dbName = "trident";

// module.exports = class MongoApi {
//   constructor(url, dbName){
//     this.url = url;
//     this.dbName = dbName;
//   }

  export function dbConnection(dbCommand, dbCollection, params) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(`${url}`, { useNewUrlParser: true }, (err, client) => {
        // handle errors by writing to file ???
        err && reject(err);
  
        const promise = dbCommand(client, dbCollection, params);
        promise.then(resolve, 
          err => { 
            logError(err);
            reject(err);
          }
        );
        client.close();
      });
    });
  }

  function dbInsert(client, dbCollection, items) {
    return new Promise((resolve, reject) => {
      client.db(dbName).collection(dbCollection).insert(items, (err, result) => {
        err && reject(err);
        resolve("success");
      });
    });
  }

  function dbQuery(client, dbCollection, params){
    const [filter, sort, limit] = params;
    return new Promise((resolve, reject) => {
      client
      .db(dbName)
      .collection(dbCollection)
      .find(filter)
      // .sort(sort)
      // .limit(limit)
      .toArray((err, result) => {
        err && reject(err);
        resolve(result);
      });
    });
  }

  function logError(err) {
    console.log(`Log error to db: ${err}`);
    throw new Error("Cannot connect to db");
    // handle error by logging to db
  }



// }

// export default MongoApi;
