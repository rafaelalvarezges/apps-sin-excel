import * as React from 'react';
import {
    ExcelExport,
    ExcelExportColumn,
} from '@progress/kendo-react-excel-export';


export default class Export extends React.Component {
    codigos = [ "ADMON. PUBLICA", "BAJA DEFINITIVA", "CENTRO COMERCIAL", "CLIENTE DEL GRUPO", "CLIENTES CONTADOS", "COMPAÑIA ELECTRICA", "COMPETIDOR",
                "CONSTRUCTORA", "CUADRISTA", "CUADRISTA AUTCION.", "DISTRIBUIDOR", "EMPLEADOS GES", "EMPLEADOS SCHNEIDER", "FACILITY SERVICES", "GGCC",
                "HOTELES", "INDUSTRIA", "INST. AUTONOMO", "INST. CLIMA-FONT. A", "INST. CLIMA-FONT. B", "INST. CLIMA-FONT.TOP", "INST. ELECTRICO A", 
                "INST. ELECTRICO B", "INST. ELECTRICO TOP", "INST. INTEGRAL A", "INST. INTEGRAL B", "INST. INTEGRAL TOP", "MANT. ALUM. PUBLICO", "OEM",
                "OTROS", "TELECOMUNICACIONES", "TRASPORTES EXTERNOS", "UTE"]
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
                let d = {...this.datos[i], "":"", "codigos": this.codigos[i]}
                this.datos[i] = d
            }else{
                console.log("es undefined")
                let d = this.datos
                d.push({
                    "_id":i,
                    "": "",
                    "": null,
                    "": "",
                    "": "",
                    "": "",
                    "": "",
                    "": "",
                    "": "",
                    "": "",
                    "": "",
                    "":"",
                    "codigos": this.codigos[i]
                })
                this.datos = d

            }
        }
        this._exporter.save(this.datos);
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

                    <ExcelExportColumn 
                        field=" " 
                        title=""  headerCellOptions={{
                        background: '#ffffff'
                    }}/>   
                    <ExcelExportColumn 
                        field="codigos" 
                        title="Códigos" 
                        headerCellOptions={{
                            background: '#e8e8e8',
                            textAlign: 'center',
                            color: '#000000'
                        }}/>
                    
                </ExcelExport> 
            </div>
        );
    }
}

