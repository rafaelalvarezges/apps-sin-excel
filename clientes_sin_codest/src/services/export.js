import * as React from 'react';
import {
    ExcelExport,
    ExcelExportColumn,
} from '@progress/kendo-react-excel-export';


export default class Export extends React.Component {
    codigos = ["ADMON. PUBLICA", "BAJA DEFINITIVA", "CENTRO COMERCIAL", "CLIENTE DEL GRUPO", "CLIENTES CONTADOS", "COMPAÑIA ELECTRICA", "COMPETIDOR"]
    lastItem = 0
    datos = {}
    constructor(props){
        super(props);
        this.datos = props.data
    }
    _exporter;
    export = () => {
        for(let i = 0; i < this.codigos.length; i++){
            console.log(this.datos[i])
            if(this.datos[i] != undefined){
                let d = {...this.datos[i], "codigos": this.codigos[i]}
                this.datos[i] = d
            }else{
                console.log("es undefined")
                let d = this.datos
                d.push({
                    cadena: null,
                    codcli: "",
                    codest: null,
                    global: "",
                    nombre: "",
                    nomdrv: "",
                    nomext: "",
                    pdv: "",
                    vta_anio_actual: "",
                    vta_anio_ant: "",
                    _id: "",
                    "codigos": this.codigos[i]
                })
                this.datos = d

            }
        }
        this._exporter.save(this.props.data);
        // console.log(this.props.data)
        this.props.setDownload(false)
    }
    
    render() {
        
        return (
            <div>
                <ExcelExport
                    data={this.datos}
                    fileName="Listado.xlsx"
                    ref={(exporter) => { this._exporter = exporter; if(exporter)this.export() }}
                >
                     {this.props.cols.map((col, index) =>{
                         this.lastItem = index
                         return <ExcelExportColumn field={col.dataField} title={col.text} key={index} />
                    })}

                    <ExcelExportColumn field="codigos" title="Códigos" key={this.lastItem + 1} />
                    
                </ExcelExport> 
            </div>
        );
    }
}

