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
      debugger;
      console.log(`success: ${res}`);
    })
    .catch(err => {
      debugger;
      console.log(`error: ${err}`);
    });
  }

}