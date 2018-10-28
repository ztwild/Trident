import axios from 'axios';
// "proxy": "http://localhost:8888"
const url = "http://localhost:8888";

export class CardsApi {

  static instertCard(card) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/card`, { card })
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  static GetCards() {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/card/catalog`)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  static getSpotifyToken() {

  }
}

export default CardsApi;
