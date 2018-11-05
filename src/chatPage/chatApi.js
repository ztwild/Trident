import axios from 'axios';

export default class ChatApi {
  static callSpotify() {
    const hostname = "localhost";
    const port = 3000;
    var clientID = "";
    const url = "https://accounts.spotify.com/authorize/";
    axios.get(url, {
      params: {
        client_id: clientID,
        response_type: "code",
        redirect_uri: `${hostname}:${port}`,
      }
    })
    .then(res => {
      console.log(`success: ${res}`);
    })
    .catch(err => {
      console.log(`error: ${err}`);
    });
  }

}