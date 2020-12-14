import * as React from 'react';
import styles from './TablaDevoluciones.module.scss';
import { ITablaDevolucionesProps } from './ITablaDevolucionesProps';
import { ITablaDevolucionesState } from './ITablaDevolucionesState';
import Container from '@material-ui/core/Container';
import Tabla from '../tabla/Tabla';
import clientService from '../../services/devolucion.service';
import { DefaultButton } from 'office-ui-fabric-react';
import ExportExcel from '../../services/exportFromJson';
import { initializeIcons } from '@uifabric/icons';
import {
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react';



const cols = [
  { dataField: 'period',      text: 'Periodo',        sort: true, align: "left",    headerOps: { width: '90px',  textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'codemp',      text: 'PDV',            sort: true, align: "left",    headerOps: { width: '70px',  textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'codpro',      text: 'Codpro',         sort: true, align: "left",    headerOps: { width: '70px',  textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'docume',      text: 'Documento',      sort: true, align: "left",    headerOps: { width: '90px',  overflow:  'hidden' },   editable: false,  editor: { type:"text" } },
  { dataField: 'implin',      text: 'Importe',        sort: true, align: "right",   headerOps: { width: '90px',  textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'fecalb',      text: 'Fecha albarán',  sort: true, align: "center",  headerOps: { width: '140px', textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'tiptra',      text: 'Tiptra',         sort: true, align: "center",  headerOps: { width: '70px' },                         editable: false,  editor: { type:"text" } },
  { dataField: 'vinculo',     text: 'Vínculo',        sort: true, align: "left",    headerOps: { width: '370px', textAlign: 'left' },     editable: true,   editor: { type:"text" } },
  { dataField: 'coment',      text: 'Comentario',     sort: true, align: "left",    headerOps: { width: '370px', textAlign: 'left' },     editable: true,   editor: { type:"text" } },
  { dataField: 'fecrec',      text: 'Fecha',          sort: true, align: "center",  headerOps: { width: '100px', textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'anyo',        text: 'Ultimo mail',    sort: true, align: "center",  headerOps: { width: '140px', textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'eliminar',    text: 'Eliminar',       sort: true, align: "center",  headerOps: { width: '100px', textAlign: 'left' },     editable: true,   editor: { type:"checkbox", value: 'true:false'} },
]

export default class TablaDevoluciones extends React.Component<ITablaDevolucionesProps, ITablaDevolucionesState>{
  constructor(props: ITablaDevolucionesProps) {
    super(props);
    this.state = {
      data: [],
      showMessage: true
    }
    this.getData()
  }


  private async getData() {
    let data = await clientService.getAll().then(async (res) => {
      return res.data
    });
    await this.setState({ data })
    // this.forceUpdate();
    return data

  }
  private renameKey(object: any):any{

    const clonedObj = {...object};
  
    let targetKey = clonedObj['anyo'];
    delete clonedObj['anyo'];
    clonedObj['Año'] = targetKey;
    
    targetKey = clonedObj['codemp'];
    delete clonedObj['codemp'];
    clonedObj['PDV'] = targetKey;

    targetKey = clonedObj['codpro'];
    delete clonedObj['codpro'];
    clonedObj['Código producto'] = targetKey;

    targetKey = clonedObj['coment'];
    delete clonedObj['coment'];
    clonedObj['Comentario'] = targetKey;

    targetKey = clonedObj['docume'];
    delete clonedObj['docume'];
    clonedObj['Documento'] = targetKey;

    targetKey = clonedObj['period'];
    delete clonedObj['period'];
    clonedObj['Período'] = targetKey;

    targetKey = clonedObj['implin'];
    delete clonedObj['implin'];
    clonedObj['Importe'] = targetKey;

    targetKey = clonedObj['fecalb'];
    delete clonedObj['fecalb'];
    clonedObj['Fecha Albarán'] = targetKey;

    targetKey = clonedObj['fecrec'];
    delete clonedObj['fecrec'];
    clonedObj['Fecha creación'] = targetKey;

    targetKey = clonedObj['tiptra'];
    delete clonedObj['tiptra'];
    clonedObj['Tipo'] = targetKey;

    targetKey = clonedObj['vinculo'];
    delete clonedObj['vinculo'];
    clonedObj['Vínculo'] = targetKey;

    delete clonedObj['eliminar']


  
    return clonedObj;
  
  };

  private filterDocs(){
    // Descartamos del excel los documentos previstos para eliminar
    let data =  this.state.data.filter(doc=>doc.eliminar==false)

    // Cambiamos el formato de las columnas del excel
    let docs = data.map(doc=>this.renameKey(doc))
    return docs
  }

  public render(): React.ReactElement<ITablaDevolucionesProps> {
    const close = () => this.setState({showMessage:false});
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
            Hay más usuarios utilizando la aplicación. Por favor, actualiza la tabla para ver los datos correctamente. 
            
          </MessageBar>
        
        : ""}

          <nav className="navbar navbar-light bg-light">
            <DefaultButton text="Exportar xls" onClick={() => {
              let docs = this.filterDocs()
              ExportExcel(docs)
            }} />

            <DefaultButton text="Actualizar" onClick={() => {
              this.getData()
            }} />
          </nav>

          {this.state.data.length != 0 ?

            <Tabla
              rows={this.state.data}
              cols={cols}
            />

            : <></>}
        </Container>

      </div>
    );
  }
}
