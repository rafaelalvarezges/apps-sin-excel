import * as React from 'react';
import styles from './TablaDevoluciones.module.scss';
import { ITablaDevolucionesProps } from './ITablaDevolucionesProps';
import { ITablaDevolucionesState } from './ITablaDevolucionesState';
import Tabla from '../tabla/Tabla';
import Container from '@material-ui/core/Container';

//Fabric ui
import { initializeIcons } from '@uifabric/icons';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import {  MessageBar,  MessageBarType,} from 'office-ui-fabric-react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';

// Servicios
import Export from '../../services/export';
import clientService from '../../services/devolucion.service';


const cols = [
  { dataField: 'period',      text: 'Periodo',        sort: true, align: "left",    headerOps: { width: '90px',  textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'codemp',      text: 'PDV',            sort: true, align: "left",    headerOps: { width: '70px',  textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'codpro',      text: 'Codpro',         sort: true, align: "left",    headerOps: { width: '70px',  textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'docume',      text: 'Documento',      sort: true, align: "left",    headerOps: { width: '90px',  overflow:  'hidden' },   editable: false,  editor: { type:"text" } },
  { dataField: 'implin',      text: 'Importe',        sort: true, align: "right",   headerOps: { width: '90px',  textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'fecalb',      text: 'Fecha albarán',  sort: true, align: "center",  headerOps: { width: '140px', textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'tiptra',      text: 'Tiptra',         sort: true, align: "center",  headerOps: { width: '70px' },                         editable: false,  editor: { type:"text" } },
  { dataField: 'vinculo',     text: 'Vínculo',        sort: true, align: "left",    headerOps: { width: '570px', textAlign: 'left' },     editable: false,   editor: { type:"text" } },
  // { dataField: 'link',        text: 'Link',           sort: true, align: "left",    headerOps: { width: '70px', textAlign: 'left' },      editable: false,  editor: { type:"text" } },
  { dataField: 'coment',      text: 'Comentario',     sort: true, align: "left",    headerOps: { width: '370px', textAlign: 'left' },     editable: true,   editor: { type:"text" } },
  { dataField: 'fecrec',      text: 'Fecha',          sort: true, align: "center",  headerOps: { width: '100px', textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'anyo',        text: 'Ultimo mail',    sort: true, align: "center",  headerOps: { width: '140px', textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'eliminar',    text: 'Eliminar',       sort: true, align: "center",  headerOps: { width: '100px', textAlign: 'left' },     editable: true,   editor: { type:"checkbox", value: 'true:false'} },

]

export default class TablaDevoluciones extends React.Component<ITablaDevolucionesProps, ITablaDevolucionesState>{
  _isMounted = false; //Controlamos que el componente se haya inicializado antes de cambiar estados
  constructor(props: ITablaDevolucionesProps) {
    super(props);
    this.state = {
      data: [],
      showMessage: true,
      download: false,
      filteredData: [],
      loading: false,
      procesados:false,
      pendientesProcesar:true
    }
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.getData()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  private async getData() {
    if(this._isMounted){
      await this.setState({loading:true})
      let data = await clientService.getAll().then(async (res) => {
        return res.data
      });
      await this.setState({ data: data, filteredData:data}, ()=>{
        this.setState({loading:false})
      })
      return data
    }
  }

  private getDate(){
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return day + "/" + month + "/" + year;
  }

  private setDownload(download: boolean){
    this.setState({download})
    console.log(this.state.download)
  }

  // Renombramos las columnas del excel
  private renameKey(object: any):any{

    const clonedObj = {...object};

    cols.map(col=>{
      let targetKey = clonedObj[col.dataField];
      delete clonedObj[col.dataField];
      clonedObj[col.text] = targetKey;
    })

    return clonedObj;
  };

  private filterDocs(){

    // Descartamos del excel los documentos previstos para eliminar
    let data =  this.state.data.filter(doc=>doc.eliminar==false)

    // Cambiamos el formato de las columnas del excel
    let docs = data.map(doc=>this.renameKey(doc))
    return docs

  }

  updateFilteredData = (filteredData:any) => {
    this.setState({ filteredData });
  }

  private procesar(){

    return new Promise((resolve, reject)=>{
      console.log("procesando")
      let procesados =  this.state.data.filter(fd=>fd.eliminar==true);
      if(procesados.length==0) this.setState({procesados:false, pendientesProcesar:false})
      let count = 0;
       procesados.map( p=>{
        p.mostrar = false;
        clientService.update(p['_id'], p).then(res=>{
          if(res) count++;
          if(count==procesados.length) {
            this.setState({procesados:true, pendientesProcesar:true})
            resolve(procesados)
          }
        })
      });
    })
  }

  private _items: ICommandBarItemProps[] = [

    {
      key: 'download',
      text: 'Descargar excel',
      iconProps: { iconName: 'Download' },
      onClick: () => {
        let docs = this.filterDocs();
        console.log(this.state.filteredData)
        this.setState({download:true});
      },
    },
    {
      key: 'procesar',
      text: 'Procesar',
      iconProps: { iconName: 'Share' },
      onClick: () => {
        this.procesar().then(()=>this.getData())
      }
    },
    {
      key: 'update',
      text: 'Actualizar tabla',
      iconProps: { iconName: 'Refresh' },
      onClick: () => this.getData(),
    },
  ];

  public render(): React.ReactElement<ITablaDevolucionesProps> {
    const close = () => this.setState({showMessage:false});
    const closeProcesados = () => this.setState({procesados:false});
    const closePendientes = () => this.setState({pendientesProcesar:true});
    initializeIcons();
    return (
      <div className={styles.TablaDevoluciones}>

        <Container maxWidth="xl" >

        {( this.props.conexiones > 1 && this.state.showMessage ) ?

            <MessageBar
              messageBarType={MessageBarType.warning}
              isMultiline={false}
              onDismiss={close}
              dismissButtonAriaLabel="Close"
            >
            Hay más usuarios utilizando la aplicación. Por favor, actualiza la tabla antes de modificar los datos.

          </MessageBar>

        : ""}

        { this.state.procesados  ?

            <MessageBar
              messageBarType={MessageBarType.success}
              isMultiline={false}
              onDismiss={closeProcesados}
              dismissButtonAriaLabel="Close"
            >
            Se han actualizado los datos correctamente

          </MessageBar>

        : ""}
         { !this.state.pendientesProcesar  ?

            <MessageBar
              messageBarType={MessageBarType.error}
              isMultiline={false}
              onDismiss={closePendientes}
              dismissButtonAriaLabel="Close"
            >
            No se han encontrado registros pendientes para eliminar

          </MessageBar>

        : ""}

          <div>
            <CommandBar
              items={this._items}
              ariaLabel="Utilizar flechas para cambiar de comandos"
            />
          </div>

          <nav className="navbar navbar-light bg-light">
             <div>
              <div className={styles.header}>
                <label >Provisión 013 (agregado) </label>
                <span> </span>
              </div>
              <div className={styles.header}>
                <label >Fecha: </label>
                <span> {this.getDate()}</span>
              </div>
            </div>
            <div>
            <div className={styles.header}>
                <label >Corte envío: 01/05/2015</label>
                <span> </span>
              </div>
              <div className={styles.header}>
                <label >Hoy: </label>
                <span> {this.getDate()}</span>
              </div>
            </div>
          </nav>

          {this.state.loading ?
            <div className={styles.spinnerWrapper}>
              <Spinner label="Cargando datos"></Spinner>
            </div>
          : ""}


          {(this.state.data.length != 0 && !this.state.loading) ?

            <Tabla
              rows={this.state.data}
              cols={cols}
              updateFilteredData={this.updateFilteredData}
            />

            : <></>}
        </Container>

        {this.state.download?
           <Export
              data = {this.state.filteredData}
              download= {this.state.download}
              setDownload = {this.setDownload.bind(this)}
              cols = {cols}
            ></Export>
         :""}

      </div>
    );
  }
}
