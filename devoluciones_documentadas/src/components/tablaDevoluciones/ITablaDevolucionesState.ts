
export interface IRow {
    id: string;
    name: string;
    price: string;
}

export interface IColumn {
    dataField: string;
    text: string;
}

export interface ITablaDevolucionesState {
    // rows: IRow[];
    // columns: IColumn[];
    showMessage:boolean;
    data: any[];
    download: boolean;
    filteredData: any[];
    loading: boolean;
}