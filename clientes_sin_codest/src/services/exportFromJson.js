import exportFromJSON from 'export-from-json'

function ExportExcel(data) {
  
    const fileName = 'clientes'
    const exportType = 'xls'

    data = data.map(row=>{
        let r = {...row}
        r['_id'] = "_" + row['_id']
        return r
    })
  
    exportFromJSON({ data, fileName, exportType })
}

export default ExportExcel;