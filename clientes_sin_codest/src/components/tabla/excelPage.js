import React, { Component } from "react"
import { Button, message, Upload } from "antd"
import { ExcelRenderer } from "react-excel-renderer"
import clientService from '../../services/client.service';
import {
    MessageBar,
    MessageBarType,
} from 'office-ui-fabric-react';

export default class ExcelPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            message: {
                type: "",
                message: ""
            },
            showMessage: false,
            file: null

        };
    }

    updateData = async () => {
        console.log(this.props.upload)
        this.state.data.map(async row => {
            let id = row['_id'].slice(1)
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
        let msg = "";
        let type = "";
        if (!file || !file[0]) {
            return;
        }
        const isExcel =
            file[0].type === "application/vnd.ms-excel" ||
            file[0].type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (!isExcel) {
            msg = "Sólo se permiten archivos de tipo Excel";
            type = "error"
        }
        console.log("file", file[0].type);
        const isLt2M = file[0].size / 1024 / 1024 < 2;
        if (!isLt2M) {
            msg = "El archivo no puede ocupar más de 2MB!";
            type = "error"
        }
       
        let message = { type: type, message: msg }
        this.setState({message, showMessage:true})
        return msg;
    }

    fileHandler = fileList => {
        let msg = ""
        let type = ""
        console.log("fileList", fileList)
        let fileObj = fileList
        this.checkFile(fileObj)
        if (!fileObj) {
            msg = "No se ha detectado ningun archivo"
            type = "error"
            let message = { type: type, message: msg }
            this.setState({ message, showMessage:true })
            return false
        } else {
            this.setState({ file: fileObj })
        }
        console.log("fileObj.type:", fileObj.type)
        if (
            !(
                fileObj.type === "application/vnd.ms-excel" ||
                fileObj.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        ) {
            msg = "No se reconoce el formato. Sólo son válidos los archivos Excel"
            type = "error"
            let message = { type: type, message: msg }
            this.setState({ message, showMessage:true })
            return false
        }
        //Procesamos el archivo
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err)
                msg = "Ha habido un error al importar el archivo"
                type = "error"
                let message = { type: type, message: msg }
                this.setState({ message, showMessage:true })
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
                    msg = "No se han encontrado datos"
                    type = "error"
                    let message = { type: type, message: msg }
                    this.setState({ message, showMessage:true })
                    return false
                } else {
                    msg = "El archivo se ha cargado correctamente"
                    type = "success"
                    let message = { type: type, message: msg }
                    this.setState({ data: newRows, message, showMessage:true })

                    this.updateData()
                }

            }
        })
        return false
    }

    render() {
        const close = () => this.setState({ showMessage: false });
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

                    {(this.state.showMessage && this.state.message.type == "error") ?

                        <MessageBar
                            messageBarType={MessageBarType.error}
                            isMultiline={false}
                            onDismiss={close}
                            dismissButtonAriaLabel="Close"
                        >
                            {this.state.message.message}

                        </MessageBar>

                        : ""}
                    {(this.state.showMessage && this.state.message.type == "success") ?

                        <MessageBar
                            messageBarType={MessageBarType.success}
                            isMultiline={false}
                            onDismiss={close}
                            dismissButtonAriaLabel="Close"
                        >
                            {this.state.message.message}

                        </MessageBar>

                        : ""}
                </div>
            </>
        )
    }
}