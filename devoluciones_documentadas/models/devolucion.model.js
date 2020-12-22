module.exports = mongoose => {
    const Devolucion = mongoose.model(
      "devolucion",
      mongoose.Schema(
        {
          _id: String,
          period: String,
          codemp: String,
          codpro: String,
          docume: String,
          implin: String,
          fecalb: String,
          tiptra: String,
          vinculo: String,
          fecrec: String,
          anyo: String,
          coment: String,
          eliminar: Boolean,
          mostrar: Boolean

        },
        {  collection:'devoluciones_documentadas' }
      )
      
    );    
  
    return Devolucion;
  };