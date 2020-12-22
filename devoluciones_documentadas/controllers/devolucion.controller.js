const db = require("../models");
const Devolucion = db.devolucion;

// Extraemos todas las devoluciones de la base de datos
exports.findAll = (req, res) => {

  Devolucion.find({ mostrar: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al extraer devoluciones."
      });
    });
};

// Extraer devolucion segun id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Devolucion.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No se ha encontrado la devolucion con id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error extrayendo devolucion con id=" + id });
    });
};

// Actualizar devolucion segun id
exports.update = (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: "No se han recibido datos a actualizar"
    });
  }

  const id = req.params.id;
  console.log(req.body)
  Devolucion.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    .then(data => {
      console.log(data)
      if (!data) {
        res.status(404).send({
          message: `No se puede actualizar la devolución con id=${id}. No se ha encontrado la devolucion!`
        });
      } else res.send({ message: "Se ha actualizado la devolucion correctamente." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar devolucion con id=" + id
      });
    });
};
