import * as React from 'react';
import styles from './TablaClientes.module.scss';
import { ITablaClientesProps } from './ITablaClientesProps';
import { ITablaClientesState } from './ITablaClientesState';
import Container from '@material-ui/core/Container';
import Tabla from '../tabla/Tabla';
import { initializeIcons } from '@uifabric/icons';
import {
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
// Servicios
import Import from '../../services/import';
import Export from '../../services/export';
import clientService from '../../services/client.service';

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
const overflowProps: IButtonProps = { ariaLabel: 'More commands' };
const exportProps: any = { fileName: "clientes", exportType: "csv" }


export default class TablaClientes extends React.Component<ITablaClientesProps, ITablaClientesState>{
  constructor(props: ITablaClientesProps) {
    super(props);
    this.state = {
      data: [], 
      filteredData: [],
      showMessage: true, 
      file: null, 
      loading:true, 
      download: false
    }
    this.getData()
  }

  private async getData() {
    this.setState({loading:true})
    let data = await clientService.getAll().then(async (res) => {
      let result = res.data.filter((d: any) => (d.codest == " " || d.codest == undefined || !d.codest))
      return result
    });
    await this.setState({ data: data, filteredData:data })
    
    this.setState({loading:false})
    return data

  }

  updateFilteredData = (filteredData:any) => {
    this.setState({ filteredData });
  }

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
  
    // Cambiamos el formato de las columnas del excel
    let docs = this.state.filteredData.map(doc=>this.renameKey(doc))
    return docs
  }
  
  private setDownload(download: boolean){
    this.setState({download})
    console.log(this.state.download)
  }

  private _items: ICommandBarItemProps[] = [
 
    {
      key: 'upload',
      text: 'Importar excel',
      iconProps: { iconName: 'Upload' },
      onClick: () => {
         $('input[type=file]').trigger('click') ;
      }
    },
    {
      key: 'download',
      text: 'Descargar excel',
      iconProps: { iconName: 'Download' },
      onClick: () => {
        let docs = this.filterDocs();
        this.setState({download:true});
       
      },
    },
    {
      key: 'update',
      text: 'Actualizar tabla',
      iconProps: { iconName: 'Refresh' },
      onClick: () => this.getData(),
    },
  ];
 
  
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

          <div>
            <CommandBar
              items={this._items}
              overflowButtonProps={overflowProps}
              ariaLabel="Utilizar flechas para cambiar de comandos"
            />
          </div>
          
          <Import/>

          {this.state.loading ? 
            <div className={styles.spinnerWrapper}>
              <Spinner label="Cargando datos"></Spinner>
            </div>
          : ""}

          {(this.state.data.length !== 0 && !this.state.loading )?

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
