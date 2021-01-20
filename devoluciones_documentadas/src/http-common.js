import axios from "axios";

export default axios.create({
  baseURL: "http://custom.apps.ges.com:8082",
  headers: {
    "Content-type": "application/json"
  }
});