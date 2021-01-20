import axios from "axios";

export default axios.create({
<<<<<<< HEAD
  baseURL: "http://custom.apps.ges.com:3009",
=======
  baseURL: "http://localhost:8081",
>>>>>>> c87a5419e137f2cbc978d3e11c9cb6e7251c2952
  headers: {
    "Content-type": "application/json"
  }
});
