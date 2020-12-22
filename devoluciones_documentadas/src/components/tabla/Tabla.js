import React, { useState, useEffect } from 'react';
import cellEditFactory ,{ Type } from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import style from '../tablaDevoluciones/TablaDevoluciones.module.scss';
import clientService from '../../services/devolucion.service';

const { SearchBar } = Search;

function Tabla(props) {

  const [rows, setRows] = useState(props.rows);
  const [cols] = useState(getCols());

  useEffect(()=>{
    setRows(props.rows)
  })

  const defaultSorted = [{
    dataField: '_id',
    order: 'asc'
  }];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Mostrando de { from} a { to} de { size} resultados
    </span>
  );

  const options = {
    showTotal: true,
    paginationTotalRenderer: customTotal,
  }


  function getCols() {

    let columns = []
    props.cols.map(column => {

      let col =
      {
        dataField: column.dataField,
        text: column.text,
        sort: column.sort,
        filter: textFilter({ placeholder: "Introducir " + column.text }),
        headerStyle: column.headerOps ,
        align: column.align,
        editable: column.editable,
        // editor: column.editor
      }
      if (column.dataField === "eliminar") {

        col = {
          ...col,
          filter: null,
          editor: { type:Type.CHECKBOX, value: "Y:N"},
          formatter: (cell, row, rowIndex) => {
            return (
              <span>
                <input className={style.check} type="checkbox" checked={cell} onChange={()=>{}} ></input>
              </span>
            );
          }
        }
      }

      columns.push(col)
    });

    return columns
  }

  async function saveCell(row) {

    console.log(row)

    await clientService.update(row['_id'], row).then((res, err) => {
      if (err) console.log(err)
      return res
    })
  }
  const afterSearch = (newResult) => {
    props.updateFilteredData(newResult)
  };

  return (

    <div className={style.TablaClientes}>

      {rows.length !== 0 ?
        <ToolkitProvider
          keyField="_id"
          search={{afterSearch}}
          data={rows}
          columns={cols}
        >
          {
            props => (
              <div>
                <nav className="navbar navbar-light bg-light">

                  <SearchBar {...props.searchProps} 
                    placeholder="Buscar"
                  />

                </nav>

                <BootstrapTable
                  {...props.baseProps}
                  keyField='_id'
                  data={rows}
                  columns={cols}
                  defaultSorted={defaultSorted}
                  //  hover
                  //  striped
                  bordered={false}
                  bootstrap4
                  pagination={paginationFactory(options)}
                  filter={filterFactory()}
                  noDataIndication="No se han encontrado resultados"
                  headerClasses={style.headerClass}
                  wrapperClasses="table-responsive"
                  cellEdit={cellEditFactory(
                    {
                      mode: 'click',
                      blurToSave: true,

                      afterSaveCell: (oldValue, newValue, row, column) => {
                       console.log(newValue)
                        console.log(row)
                        if(column.dataField == "eliminar"){
                          newValue == 'Y' ? row.eliminar = true : row.eliminar = false
                        }
                        
                          saveCell(row)
                        
                      }
                    }
                  )}
                />
              </div>
            )}
        </ToolkitProvider>
        : <></>}

    </div>
  );

}

export default Tabla;