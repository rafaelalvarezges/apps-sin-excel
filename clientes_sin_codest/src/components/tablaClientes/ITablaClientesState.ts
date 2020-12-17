
export interface IRow {
    id: string;
    name: string;
    price: string;
}

export interface IColumn {
    dataField: string;
    text: string;
}

export interface ITablaClientesState {
    // rows: IRow[];
    // columns: IColumn[];
    data: any[];
    showMessage:boolean;
    file: any;
    filteredData:any[];
    loading:boolean;
    download: boolean;
}