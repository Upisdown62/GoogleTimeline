import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import ApiService from 'module/ApiService'

interface IProps {
    imgFlag: string,
    imagePath: string[],
    updateImg: (s: string[]) => void
}

function ImageUpload(props:IProps) {
    const [ImagePath, setImagePath] = useState<string[]>([])
    const [DisabledFlag, setDisabledFlag] = useState<boolean>(true)

    useEffect(() => {
        props.imgFlag === '# 항목을 선택하세요' ? setDisabledFlag(true) : setDisabledFlag(false)
    }, [props.imgFlag])

    useEffect(() => {
        if(props.imagePath && props.imagePath.length !== 0) setImagePath(props.imagePath)
        else setImagePath([])
    }, [props.imagePath])

    const dropHandler = async(files: File[]) => {
        let formData = new FormData()
        for(let i = 0; i < files.length; i++){
            formData.append("file", files[i])
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        
        const res = await ApiService.imageUpload(formData, config)
        
        if(res.success){
            //console.log('>>> files', response.data.files)
            let newImgPath: string[] = []
            ImagePath.map((cur) => (
                newImgPath.push(cur)
            ))
            res.files.map((cur) => {
                newImgPath.push(`${process.env.REACT_APP_SERVER_HOST}/${cur.path}`)
            })
            //setImagePath(newImgPath)
            //console.log('>>>>>>>> ImageUpload newImgPath', newImgPath)
            props.updateImg(newImgPath)
        } else{
            alert('파일 저장 실패!')
        }
    }
    

    const deleteHandler = (cur: string) => {
        props.updateImg(ImagePath.filter((key) => key !== cur))
    }

    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <Dropzone
                disabled={DisabledFlag} 
                onDrop={dropHandler}
                multiple>
                {({getRootProps, getInputProps}) => (
                <section>
                <div style={{
                    width:300, height: 240, border:'1px solid lightgray',
                    display:'flex', alignItems: 'center', justifyContent:'center'
                    }}
                    {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon type="plus" style={{ fontSize:'3rem'}}/>
                </div>
                </section>
            )}
            </Dropzone>

            <div style={{ width:'350px', height: '240px', overflowY:'scroll'}}>
                {/* {Images.map((image, index) => (
                    <div key={index} onClick={() => deleteHandler(image)}>
                        <img style={{minWidth:'300px', width:'300px', height:'240px'}}
                        src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))} */}
                {ImagePath && ImagePath.map((cur, index) => (
                    <div key={index} onClick={() => deleteHandler(cur)}>
                        <img style={{minWidth:'300px', width:'300px', height:'240px'}}
                            src={cur}
                            alt=""
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageUpload
