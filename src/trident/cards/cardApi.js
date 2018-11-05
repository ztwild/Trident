import axios from 'axios';
import store from '../../store/store';

export class CardsApi {

  static instertCard(card) {
    const {connection: {hostname: host}} = store.getState();
    const url = `http://${host}:8888`;
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
    const {connection: {hostname: host}} = store.getState();
    const url = `http://${host}:8888`;
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
