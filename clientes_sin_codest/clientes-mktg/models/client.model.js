module.exports = mongoose => {
    const Client = mongoose.model(
      "client",
      mongoose.Schema(
        {
          _id: String,
          pdv: String,
          codcli: String,
          global: String,
          nombre: String,
          cadena: String,
          codest: String,
          nomext: String,
          nomdrv: String,
          vta_anio_ant: String,
          vta_anio_actual: String,

        },
        {  collection:'clientes_sin_codest' }
      )
      
    );    
  
    return Client;
  };