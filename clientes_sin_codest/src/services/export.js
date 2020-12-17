import * as React from 'react';
import {
    ExcelExport,
    ExcelExportColumn,
} from '@progress/kendo-react-excel-export';


export default class Export extends React.Component {
    constructor(props){
        super(props);
        
       
    }
    _exporter;
    export = () => {
        this._exporter.save(this.props.data);
        console.log(this.props.data)
        this.props.setDownload(false)
    }
    
    render() {
        
        return (
            <div>
               {/* <button className="k-button" onClick={this.export}>Export to Excel</button> */}
                <ExcelExport
                    data={this.props.data}
                    // group={group}
                    fileName="Listado.xlsx"
                    ref={(exporter) => { this._exporter = exporter; if(exporter)this.export() }}
                >
                    <ExcelExportColumn field="_id" title="Id"  />
                    <ExcelExportColumn field="pdv" title="PDV" />
                    <ExcelExportColumn field="global" title="Global" />
                    <ExcelExportColumn field="codcli" title="Cliente" />
                    <ExcelExportColumn field="nombre" title="Nombre" />
                    <ExcelExportColumn field="cadena" title="Cadena" />
                    <ExcelExportColumn field="codest" title="Cod. Est" />
                    <ExcelExportColumn field="nomext" title="Com. Exterior" />
                    <ExcelExportColumn field="nomdrv" title="DRV" />
                    <ExcelExportColumn
                        field="vta_anio_ant"
                        title="Venta 2019"
                        cellOptions={{ format: '#.##0,00' }}
                    />
                    <ExcelExportColumn
                        field="vta_anio_actual"
                        title="Venta 2020"
                        cellOptions={{ format: '#.##0,00' }}
                    />
                    
                </ExcelExport>
            </div>
        );
    }
}

