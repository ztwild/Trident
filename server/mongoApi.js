const mongod = require('mongodb');

const MongoClient = mongod.MongoClient
// const url = "mongodb://localhost:27017/";
// const dbName = "trident";
var _url;
var _dbName;

module.exports = class MongoApi {
  constructor(url, dbName){
    _url = url;
    _dbName = dbName;
  }

  dbConnection(dbCommand, dbCollection, params) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(`${_url}`, { useNewUrlParser: true }, (err, client) => {
        // handle errors by writing to file ???
        err && reject(err);
  
        const promise = dbCommand(client, dbCollection, params);
        promise.then(resolve, err => this.logError(err));
        client.close();
      });
    });
  }

  dbInsert(client, dbCollection, items) {
    return new Promise((resolve, reject) => {
      client.db(_dbName).collection(dbCollection).insertMany(items, (err, result) => {
        err && reject(err);
        resolve("success");
      });
    });
  }

  dbQuery(client, dbCollection, params){
    const [filter, sort, limit] = params;
    return new Promise((resolve, reject) => {
      client
      .db(_dbName)
      .collection(dbCollection)
      .find(filter)
      .sort(sort)
      // .limit(limit)
      .toArray((err, result) => {
        err && reject(err);
        resolve(result);
      });
    });
  }

  logError(err) {
    console.log(`Log error to db: ${err}`);
    throw new Error("Cannot connect to db");
    // handle error by logging to db
  }


}


