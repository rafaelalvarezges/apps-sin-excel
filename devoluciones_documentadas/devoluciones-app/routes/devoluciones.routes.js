module.exports = app => {
    const devolucion = require("../controllers/devolucion.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all clients
    router.get("/", devolucion.findAll);
  
    // Retrieve a single client with id
    router.get("/:id", devolucion.findOne);
  
    // Update a client with id
    router.put("/:id", devolucion.update);
  
    app.use('/devoluciones', router);
  };