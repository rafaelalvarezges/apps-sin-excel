import axios from "axios";

export default axios.create({
  baseURL: "http://custom.apps.ges.com:8080",
  headers: {
    "Content-type": "application/json"
  }
});