module.exports = app => {
    const clients = require("../controllers/client.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all clients
    router.get("/", clients.findAll);
  
    // Retrieve a single client with id
    router.get("/:id", clients.findOne);
  
    // Update a client with id
    router.put("/:id", clients.update);
  
    app.use('/clients', router);
  };