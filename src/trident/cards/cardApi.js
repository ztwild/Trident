import axios from 'axios';
// "proxy": "http://localhost:8888"
// const url = "http://localhost:8888";

export class CardsApi {
  // const config = {
    //   headers: {'X-Requested-With': 'HttpRequest'},
    // }
    // axios.put(`${url}/card`, { card })

  static instertCard(card) {
    return new Promise((resolve, reject) => {
      axios.put("/card", { card })
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
      axios.get("/card/catalog")
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }
}

export default CardsApi;
