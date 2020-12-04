const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require("cors");
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// configuramos cors
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// redireccionamos a la pagina principal
app.use(express.static(path.join(__dirname, 'build', 'index.html')));

// rutas clientes
require("./routes/client.routes")(app);

 // Configuracion del socket
let connectedUsersCount = 0;
io.on('connection', socket => {
  connectedUsersCount ++;
  io.emit('usuarios', connectedUsersCount);

  socket.on('disconnect',()=>{ 
    connectedUsersCount --;
    io.emit('usuarios', connectedUsersCount);
  });
}); 

// Conexion a la base de datos
const db = require("./models");
const PORT = process.env.PORT || 8080;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Se ha conectado a la base de datos!");
    http.listen(PORT, () => console.log(`Escuchando puerto ${PORT}`));
  })
  .catch(err => {
    console.log("No se ha podido conectar a la base de datos", err);
    process.exit();
  });
