const db = require("../models");
const Client = db.clients;

// Retrieve all Clients from the database.
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
            err.message || "Some error occurred while retrieving clients."
        });
      });
};

// Find a single Client with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Client.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Client with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Client with id=" + id });
    });
};

// Update a Client by the id in the request
exports.update = (req, res) => {
  console.log("update")
  const id = req.params.id;
  console.log(req.body)
  // console.log(req.data)
  console.log("id: "  + id)
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  console.log(req.body)


  Client.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Client with id=${id}. Maybe Client was not found!`
        });
      } else res.send({ message: "Client was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Client with id=" + id
      });
    });
};
