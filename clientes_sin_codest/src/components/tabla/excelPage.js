import React, { Component } from "react"
import { Button, Upload } from "antd"
import { ExcelRenderer } from "react-excel-renderer"
import clientService from '../../services/client.service';

export default class ExcelPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            errorMessage: null,
            file: null

        };
    }

    updateData = async () => {
        this.state.data.map(async row => {
            let id=row['_id'].slice(1)
            row['_id'] = id;
            console.log(row)
           
            await clientService.update(id, row).then((res, err) => {
                if (err) console.log(err)
                console.log(res)
                return res
            })
        })
    }

    handleSave = row => {
        const newData = [...this.state.rows]
        const index = newData.findIndex(item => row.key === item.key)
        const item = newData[index]
        newData.splice(index, 1, {
            ...item,
            ...row,
        })
        this.setState({ rows: newData })
    }

    checkFile(file) {
        let errorMessage = "";
        if (!file || !file[0]) {
            return;
        }
        const isExcel =
            file[0].type === "application/vnd.ms-excel" ||
            file[0].type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (!isExcel) {
            errorMessage = "Sólo se permiten archivos de tipo Excel";
        }
        console.log("file", file[0].type);
        const isLt2M = file[0].size / 1024 / 1024 < 2;
        if (!isLt2M) {
            errorMessage = "El archivo no puede ocupar más de 2MB!";
        }
        console.log("errorMessage", errorMessage);
        return errorMessage;
    }

    fileHandler = fileList => {
        console.log("fileList", fileList)
        let fileObj = fileList
        this.checkFile(fileObj)
        if (!fileObj) {
            this.setState({
                errorMessage: "No se ha detectado ningun archivo",
            })
            return false
        }else{
            this.setState({file: fileObj})
        }
        console.log("fileObj.type:", fileObj.type)
        if (
            !(
                fileObj.type === "application/vnd.ms-excel" ||
                fileObj.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        ) {
            this.setState({
                errorMessage: "No se reconoce el formato. Sólo son válidos los archivos Excel",
            })
            return false
        }
        //Procesamos el archivo
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err)
            } else {
                let newRows = []
                console.log(resp)
                resp.rows.slice(1).map((row, index) => {
                    console.log(row)
                    if (row && row !== "undefined") {
                        newRows.push({
                            _id: row[0],
                            codest: row[6],
                        })
                    }
                })
                if (newRows.length === 0) {
                    console.log("No se han encontrado datos")
                    this.setState({
                        errorMessage: "No data found in file!",
                    })
                    return false
                } else {
                    this.setState({
                        data: newRows,
                        errorMessage: null,
                    })
                    this.updateData()
                }
    
            }
        })
        return false
    }
    
    render() {

        return (
            <>
                <div>
                  
                    <Upload
                        name="file"
                        beforeUpload={this.fileHandler}
                        onRemove={() => this.setState({ rows: [] })}
                        multiple={false}
                    >                        
                    </Upload>
                </div>
            </>
        )
    }
}