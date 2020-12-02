
import * as React from 'react';
import styles from './TablaDevoluciones.module.scss';
import { ITablaDevolucionesProps } from './ITablaDevolucionesProps';
import { ITablaDevolucionesState } from './ITablaDevolucionesState';
import Container from '@material-ui/core/Container';
import Tabla from '../tabla/Tabla';
import clientService from '../../services/devolucion.service';
import { DefaultButton } from 'office-ui-fabric-react';
import ExportExcel from '../../services/exportFromJson';

const cols = [
  { dataField: 'pdv', text: 'PDV', sort: true, headerOps: { width: '90px', textAlign: 'center' } },
  { dataField: 'global', text: 'Global', sort: true, headerOps: { width: '90px', textAlign: 'center' } },
  { dataField: 'codcli', text: 'Cliente', sort: true, headerOps: { width: '90px', textAlign: 'center' } },
  { dataField: 'nombre', text: 'Nombre', sort: true, headerOps: { width: '300px', overflow: 'hidden' } },
  { dataField: 'cadena', text: 'Cadena', sort: true, headerOps: { width: '150px', textAlign: 'center' } },
  { dataField: 'codest', text: 'Codest', sort: true, headerOps: { width: '180px', textAlign: 'center' } },
  { dataField: 'nomext', text: 'C.Ext', sort: true, headerOps: { width: '240px' } },
  { dataField: 'nomdrv', text: 'DRV', sort: true, headerOps: { width: '220px', textAlign: 'center' } },
  { dataField: 'vta_anio_ant', text: 'Venta 2019', sort: true, headerOps: { width: '100px', textAlign: 'center' } },
  { dataField: 'vta_anio_actual', text: 'Venta 2020', sort: true, headerOps: { width: '100px', textAlign: 'center' } },
]

export default class TablaDevoluciones extends React.Component<ITablaDevolucionesProps, ITablaDevolucionesState>{
  constructor(props: ITablaDevolucionesProps) {
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

  public render(): React.ReactElement<ITablaDevolucionesProps> {

    return (
      <div className={styles.TablaDevoluciones}>

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
