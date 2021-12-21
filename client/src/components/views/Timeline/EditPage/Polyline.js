import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import ImageUpload from '../../../utils/ImageUpload'
import axios from 'axios'
import _ from 'lodash'
import { useSelector } from "react-redux"
import { TimePicker } from 'antd'
import Moment from 'moment'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

function Polyline(props) {
    const { TextArea } = Input
    const [CurData, setCurData] = useState([])
    const [HeaderText, setHeaderText] = useState("")
    //const user = useSelector(state => state.user)
    const [Date, setDate] = useState("")
    const [Title, setTitle] = useState("")
    const [UseFlag, setUseFlag] = useState(false)
    const [Name, setName] = useState("")
    const [StartTime, setStartTime] = useState()
    const [EndTime, setEndTime] = useState()
    const [Description, setDescription] = useState("")
    const [ImgPath, setImgPath] = useState([])


    useEffect(() => {
        setCurData(props.polyline)
    }, [props.polyline])

    useEffect(() => {
        if(CurData) {
            //console.log('CurData >> ', CurData)
            const tempIdx = _.get(CurData[0], 'index', '항목을 선택하세요')            
            setHeaderText(`# ${tempIdx}`)
            setDate(_.get(CurData[0], 'date'))
            setTitle(_.get(CurData[0], 'title'))
            setUseFlag(_.get(CurData[0], 'useFlag', false))
            setName(_.get(CurData[0], 'name'))
            setStartTime(Moment(_.get(CurData[0], 'startTime', '00:00:00')))
            setEndTime(Moment(_.get(CurData[0], 'endTime', '00:00:00')))
            setDescription(_.get(CurData[0], 'description'))
            setImgPath(_.get(CurData[0], 'image'))
        }
    }, [CurData])


    const submitHandler = (event) => {
        event.preventDefault() //확인눌렀을때 화면을 다시 그리지 않게 해줌
        const putStartTime = Date + " " + Moment(StartTime).format('HH:mm:ss')
        const putEndTime = Date + " " + Moment(EndTime).format('HH:mm:ss')
        const body = {
            id: _.get(CurData[0], '_id'),
            title: Title,
            useFlag: UseFlag,
            name: Name,
            startTime: putStartTime,
            endTime: putEndTime,
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

    const handleFlagChange = () => {
        setUseFlag(!UseFlag)
    }

    const nameChangeHandler = (e) => {
        setName(e.currentTarget.value)
    }

    const stChangeHandler = (time) => {
        setStartTime(time)
    }

    const etChangeHandler = (time) => {
        setEndTime(time)
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
                            <div style={{width:'50%', float: 'left'}}>{HeaderText}</div>
                            <div style={{width:'50%', float: 'left'}}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={UseFlag}
                                    onChange={handleFlagChange}
                                    name="useFlag"
                                    color="primary"
                                />
                                }
                                label="사용여부"
                            />
                            </div>
                        </div>
                        <div style={{margin: "10px"}}>
                            <label>제목</label>
                            <Input 
                                value={Title} 
                                onChange={titleChangeHandler}
                            />
                        </div>

                        <div style={{margin: "10px"}}>
                            <label>방문장소</label>
                            <Input 
                                value={Name} 
                                onChange={nameChangeHandler}
                            />
                        </div>

                        <div style={{margin: "10px"}}>
                            <div style={{display: 'inline-block', flaot:'left', width:'25%'}}>
                                Start Time
                            </div>
                            <div style={{display: 'inline-block', flaot:'left', width:'25%'}}>
                                <TimePicker
                                    value={StartTime}
                                    onChange={stChangeHandler}
                                />
                            </div>
                            <div style={{display: 'inline-block', flaot:'left', width:'25%'}}>
                                End Time
                            </div>
                            <div style={{display: 'inline-block', flaot:'left', width:'25%'}}>
                                <TimePicker
                                    value={EndTime}
                                    onChange={etChangeHandler}
                                />
                            </div>
                        </div>

                        <div style={{margin: "10px"}}>
                            <label>내용</label>
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
