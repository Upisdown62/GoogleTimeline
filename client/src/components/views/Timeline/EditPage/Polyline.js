import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import ImageUpload from '../../../utils/ImageUpload'
import axios from 'axios'
import _ from 'lodash'
import { useSelector } from "react-redux";

function Polyline(props) {
    const { TextArea } = Input
    const [CurData, setCurData] = useState([])
    const [HeaderText, setHeaderText] = useState("")
    const user = useSelector(state => state.user)
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [ImgPath, setImgPath] = useState([])

    useEffect(() => {
        setCurData(props.polyline)
    }, [props.polyline])

    useEffect(() => {
        if(CurData) {
            //console.log('CurData >> ', CurData)
            const tempIdx = _.get(CurData[0], 'index') ? _.get(CurData[0], 'index') : "항목을 선택하세요"
            setHeaderText(`# ${tempIdx}`)
            setTitle(_.get(CurData[0], 'title'))
            setDescription(_.get(CurData[0], 'description'))
            setImgPath(_.get(CurData[0], 'image'))
        }
    }, [CurData])


    const submitHandler = (event) => {
        event.preventDefault() //확인눌렀을때 화면을 다시 그리지 않게 해줌

        const body = {
            id: _.get(CurData[0], '_id'),
            title: Title,
            description: Description,
            image:ImgPath
        }
        axios.post("/api/polyline/update", body)
        .then(response => {
            if(response.data.success){
                setCurData([response.data.timelineInfo])
                props.updateSave(_.get(CurData[0], 'index'))
                alert('데이터를 저장하였습니다!')
            } else{
                alert('데이터 저장에 실패했습니다!')
            }
        })
    }

    const titleChangeHandler = (e) => {
        setTitle(e.currentTarget.value)
    }

    const descChangeHandler = (e) => {
        setDescription(e.currentTarget.value)
    }

    const updateImgHandler = (newImgPath) => {
        setImgPath(newImgPath)
    }
    
    
    return (
        <div>
            {CurData && 
                <Form onSubmit={submitHandler}>
                    <div>
                        <ImageUpload
                            imgFlag={HeaderText}
                            imagePath={ImgPath}
                            updateImg={updateImgHandler}/>                                        
                    </div>

                    <div>
                        <div style={{margin: "10px", fontSize: "16px"}}>
                            {HeaderText}
                        </div>
                        <div style={{margin: "10px"}}>
                            <label>Title</label>
                            <Input 
                                value={Title} 
                                onChange={titleChangeHandler}
                            />
                        </div>

                        <div style={{margin: "10px"}}>
                            <label>Description</label>
                            <TextArea 
                                value={Description} 
                                rows={4}
                                onChange={descChangeHandler}
                            />
                        </div>
                        
                        <div style={{margin: "10px"}}>
                            <Button htmlType="submit">
                                저장
                            </Button>
                        </div>
                    </div>
            </Form>
            }
        </div>
    )
}

export default Polyline
