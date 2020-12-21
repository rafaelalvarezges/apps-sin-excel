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
        this.props.setDownload(false)
    }
    
    render() {
        
        return (
            <div>
                <ExcelExport
                    data={this.props.data}
                    fileName="Listado.xlsx"
                    ref={(exporter) => { this._exporter = exporter; if(exporter)this.export() }}
                >
                    {this.props.cols.map((col, index) =>{
                         return <ExcelExportColumn field={col.dataField} title={col.text} key={index} />
                    })}
                    
                </ExcelExport>
            </div>
        );
    }
}

