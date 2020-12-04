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
  { dataField: 'period',      text: 'Periodo',        sort: true, align: "left",  headerOps: { width: '90px',  textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'codemp',      text: 'PDV',            sort: true, align: "left",  headerOps: { width: '70px',  textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'codpro',      text: 'Codpro',         sort: true, align: "left",  headerOps: { width: '70px',  textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'docume',      text: 'Documento',      sort: true, align: "left",  headerOps: { width: '90px',  overflow:  'hidden' },   editable: false,  editor: { type:"text" } },
  { dataField: 'implin',      text: 'Importe',        sort: true, align: "right", headerOps: { width: '90px',  textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'fecalb',      text: 'Fecha albarán',  sort: true, align: "left",  headerOps: { width: '100px', textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'tiptra',      text: 'Tiptra',         sort: true, align: "left",  headerOps: { width: '70px'                       },   editable: false,  editor: { type:"text" } },
  { dataField: 'vinculo',     text: 'Vínculo',        sort: true, align: "left",  headerOps: { width: '370px', textAlign: 'left' },     editable: true,   editor: { type:"text" } },
  { dataField: 'comentario',  text: 'Comentario',     sort: true, align: "left",  headerOps: { width: '370px', textAlign: 'left' },     editable: true,   editor: { type:"text" } },
  { dataField: 'fecrec',      text: 'Fecha',          sort: true, align: "left",  headerOps: { width: '100px', textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'anyo',        text: 'Ultimo mail',    sort: true, align: "left",  headerOps: { width: '100px', textAlign: 'left' },     editable: false,  editor: { type:"text" } },
  { dataField: 'eliminar',    text: 'Eliminar',       sort: true, align: "left",  headerOps: { width: '100px', textAlign: 'left' },     editable: false,  editor: { type:"checkbox", value: 'Y:N'} },
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
              ExportExcel(this.state.data)
            }} />

            <DefaultButton text="Actualizar" onClick={() => {
              this.forceUpdate()
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
