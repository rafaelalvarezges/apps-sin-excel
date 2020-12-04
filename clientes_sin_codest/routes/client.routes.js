module.exports = app => {
    const clients = require("../controllers/client.controller.js");
  
    var router = require("express").Router();
  
    // Extraer todos los clientes
    router.get("/", clients.findAll);
  
    // Extraer un cliente segun id
    router.get("/:id", clients.findOne);
  
    // Actualizar un cliente segun id
    router.put("/:id", clients.update);
  
    app.use('/clients', router);
  };