const db = require("../models");
const Client = db.clients;

// Extraer todos los clientes de la base de datos.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Client.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al extraer los clientes de la base de datos."
        });
      });
};

// Extraer Cliente segun id. 
exports.findOne = (req, res) => {
  const id = req.params.id;

  Client.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No se ha encontrado el cliente con id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error al extraer el Cliente con id=" + id });
    });
};

// Actualizamos el cliente segun la id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Los datos a actualizar no pueden estar vacios!"
    });
  }
  console.log(req.body)
  console.log(req.params.id)
  console.log(req.params)
  const id = req.params.id;
  Client.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se ha podido actualizar el cliente con id=${id}. No se ha encontrado en la base de datos`
        });
      } else res.send({ message: "El cliente se ha creado correctamente." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el cliente con id=" + id
      });
    });
};
