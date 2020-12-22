import axios from "axios";

export default axios.create({
  baseURL: "http://10.132.0.14:8082",
  headers: {
    "Content-type": "application/json"
  }
});