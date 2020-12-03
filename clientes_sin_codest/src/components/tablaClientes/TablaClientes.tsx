
import * as React from 'react';
import styles from './TablaClientes.module.scss';
import { ITablaClientesProps } from './ITablaClientesProps';
import { ITablaClientesState } from './ITablaClientesState';
import Container from '@material-ui/core/Container';
import Tabla from '../tabla/Tabla';
import clientService from '../../services/client.service';
import { DefaultButton } from 'office-ui-fabric-react';
import ExportExcel from '../../services/exportFromJson';

const cols = [
  { dataField: 'pdv',             text: 'PDV',           sort: true, align: "left",   editable: false, headerOps: { width: '90px' } },
  { dataField: 'global',          text: 'Global',        sort: true, align: "left",   editable: false, headerOps: { width: '90px' } },
  { dataField: 'codcli',          text: 'Cliente',       sort: true, align: "left",   editable: false, headerOps: { width: '90px'} },
  { dataField: 'nombre',          text: 'Nombre',        sort: true, align: "left",   editable: false, headerOps: { width: '300px', overflow: 'hidden' } },
  { dataField: 'cadena',          text: 'Cadena',        sort: true, align: "left",   editable: false, headerOps: { width: '150px'} },
  { dataField: 'codest',          text: 'Cod. Est',      sort: true, align: "left",   editable: true, headerOps: { width: '180px' } },
  { dataField: 'nomext',          text: 'Com. Exterior', sort: true, align: "left",   editable: false, headerOps: { width: '240px' } },
  { dataField: 'nomdrv',          text: 'DRV',           sort: true, align: "left",   editable: false, headerOps: { width: '220px' } },
  { dataField: 'vta_anio_ant',    text: 'Venta 2019',    sort: true, align: "right",  editable: false, headerOps: { width: '130px' } },
  { dataField: 'vta_anio_actual', text: 'Venta 2020',    sort: true, align: "right",  editable: false, headerOps: { width: '130px' } },
]

export default class TablaClientes extends React.Component<ITablaClientesProps, ITablaClientesState>{
  constructor(props: ITablaClientesProps) {
    super(props);
    this.state = {
      data: []
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

  public render(): React.ReactElement<ITablaClientesProps> {

    return (
      <div className={styles.TablaClientes}>

        <Container maxWidth="xl" >

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
