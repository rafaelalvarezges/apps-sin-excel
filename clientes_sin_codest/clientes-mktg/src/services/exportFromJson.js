import exportFromJSON from 'export-from-json'

function ExportExcel(data) {
  
    const fileName = 'clientes'
    const exportType = 'xls'

    exportFromJSON({ data, fileName, exportType })
}

export default ExportExcel;