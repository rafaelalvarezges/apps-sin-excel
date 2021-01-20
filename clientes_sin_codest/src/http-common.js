import axios from "axios";

export default axios.create({
  baseURL: "http://custom.apps.ges.com:3009",
  headers: {
    "Content-type": "application/json",
    "Host":"http://custom.apps.ges.com/:3009"
  }
});
