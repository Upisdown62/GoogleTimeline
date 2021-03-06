import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import DeleteIcon from '@material-ui/icons/Delete'

interface IProps {
    initFiles: File[],
    updateFiles: (f: File[]) => void
}


function FileUpload(props:IProps) {
    const [Files, setFiles] = useState<File[]>([])

    useEffect(() => {
        setFiles(props.initFiles)
    }, [props.initFiles])

    const dropHandler = (files: File[]) => {
        let newFiles = [...Files]
        files.map((cur) => {
            newFiles.push(cur)
        })
        setFiles(newFiles)
        props.updateFiles(newFiles)
    }

    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <Dropzone 
                onDrop={dropHandler}
                multiple>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div style={{
                            width:200, height: 140, border:'1px solid lightgray',
                            display:'flex', alignItems: 'center', justifyContent:'center'
                            }}
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize:'2rem'}}/>
                        </div>
                    </section>
                )}
            </Dropzone>
            <div style={{ width:'400px', height: '140px', overflowY:'auto'}}>
                {Files && Files.map((cur, index) => (
                    <div style={{margin: '0px 10px'}} key={index}>
                        {`# ${index+1} - ${cur.name}`}
                        <div style={{display:'inline-block', marginLeft: '5px'}}>
                            <DeleteIcon 
                                    style={{verticalAlign:'middle'}}
                                    onClick={() => {
                                        setFiles(Files.filter((file) => file !== cur))
                                        props.updateFiles(Files.filter((file) => file !== cur))
                                    }}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FileUpload