
import * as React from 'react';
import styles from './TablaClientes.module.scss';
import { ITablaClientesProps } from './ITablaClientesProps';
import { ITablaClientesState } from './ITablaClientesState';
import Container from '@material-ui/core/Container';
import Tabla from '../tabla/Tabla';
import clientService from '../../services/client.service';
import { DefaultButton } from 'office-ui-fabric-react';
import ExportExcel from '../../services/exportFromJson';
import { initializeIcons } from '@uifabric/icons';
import {
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react';


const cols = [
  { dataField: 'pdv',             text: 'PDV',           sort: true, align: "left",   editable: false, headerOps: { width: '90px' } },
  { dataField: 'global',          text: 'Global',        sort: true, align: "left",   editable: false, headerOps: { width: '90px' } },
  { dataField: 'codcli',          text: 'Cliente',       sort: true, align: "left",   editable: false, headerOps: { width: '90px'} },
  { dataField: 'nombre',          text: 'Nombre',        sort: true, align: "left",   editable: false, headerOps: { width: '300px', overflow: 'hidden' } },
  { dataField: 'cadena',          text: 'Cadena',        sort: true, align: "left",   editable: false, headerOps: { width: '150px'} },
  { dataField: 'codest',          text: 'Cod. Est',      sort: true, align: "left",   editable: true,  headerOps: { width: '180px' } },
  { dataField: 'nomext',          text: 'Com. Exterior', sort: true, align: "left",   editable: false, headerOps: { width: '240px' } },
  { dataField: 'nomdrv',          text: 'DRV',           sort: true, align: "left",   editable: false, headerOps: { width: '220px' } },
  { dataField: 'vta_anio_ant',    text: 'Venta 2019',    sort: true, align: "right",  editable: false, headerOps: { width: '130px' } },
  { dataField: 'vta_anio_actual', text: 'Venta 2020',    sort: true, align: "right",  editable: false, headerOps: { width: '130px' } },
]


export default class TablaClientes extends React.Component<ITablaClientesProps, ITablaClientesState>{
  constructor(props: ITablaClientesProps) {
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
    this.forceUpdate()
    return data

  }

  private renameKey(object: any):any{

    const clonedObj = {...object};
  
    let targetKey = clonedObj['pdv'];
    delete clonedObj['pdv'];
    clonedObj['PDV'] = targetKey;
    
    targetKey = clonedObj['codcli'];
    delete clonedObj['codcli'];
    clonedObj['Cliente'] = targetKey;

    targetKey = clonedObj['global'];
    delete clonedObj['global'];
    clonedObj['Global'] = targetKey;

    targetKey = clonedObj['nombre'];
    delete clonedObj['nombre'];
    clonedObj['Nombre'] = targetKey;

    targetKey = clonedObj['cadena'];
    delete clonedObj['cadena'];
    clonedObj['Cadena'] = targetKey;

    targetKey = clonedObj['codest'];
    delete clonedObj['codest'];
    clonedObj['Cod. Est'] = targetKey;

    targetKey = clonedObj['nomext'];
    delete clonedObj['nomext'];
    clonedObj['Com. Exterior'] = targetKey;

    targetKey = clonedObj['nomdrv'];
    delete clonedObj['nomdrv'];
    clonedObj['DRV'] = targetKey;

    targetKey = clonedObj['vta_anio_ant'];
    delete clonedObj['vta_anio_ant'];
    clonedObj['Venta 2019'] = targetKey;

    targetKey = clonedObj['vta_anio_actual'];
    delete clonedObj['vta_anio_actual'];
    clonedObj['Venta 2020'] = targetKey;
  
    return clonedObj;
  
  };

  private filterDocs(){
  
    // Cambiamos el formato de las columnas del excel
    let docs = this.state.data.map(doc=>this.renameKey(doc))
    return docs
  }

  public render(): React.ReactElement<ITablaClientesProps> {
    const close = () => this.setState({showMessage:false});
    initializeIcons();
    return (
      <div className={styles.TablaClientes}>
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

          {this.state.data.length !== 0 ?

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
