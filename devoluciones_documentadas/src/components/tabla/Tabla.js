import React, { useState, useEffect } from 'react';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import style from '../tablaDevoluciones/TablaDevoluciones.module.scss';
import clientService from '../../services/devolucion.service';

const { SearchBar } = Search;

function Tabla(props) {

  const [rows, setRows] = useState(props.rows);
  const [cols, setCols] = useState(getCols());

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
        filter: textFilter({ placeholder: column.text }),
        headerStyle: (col, colIndex) => { return column.headerOps },
        editable: column.editable,
        editor: column.editor
      }
      if (column.dataField == "eliminar") {

        col = {
          ...col,
          formatter: (cell, row) => {
            return (
              <span>
                <input type="checkbox" checked={cell} ></input>
              </span>
            );
          },
          headerFormatter: (column, colIndex) => {
            return (
              <div>
                <label>{column.text}</label>
                <div><input type="checkbox" name="eliminar" value="" /></div>
              </div>
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

    let res = await clientService.update(row['_id'], row).then((res, err) => {
      if (err) console.log(err)
      console.log(res)
      return res
    })
  }

  return (

    <div className={style.TablaClientes}>

      {rows.length != 0 ?
        <ToolkitProvider
          keyField="_id"
          search={true}
          data={rows}
          columns={cols}
        >
          {
            props => (
              <div>
                <nav className="navbar navbar-light bg-light">

                  <SearchBar {...props.searchProps} />

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