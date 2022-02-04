import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import ImageUpload from 'components/utils/ImageUpload'
import { get } from 'lodash'
import { TimePicker } from 'antd'
import Moment from 'moment'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import ApiService from 'module/ApiService'
import { MResPolyline, MReqPolyline } from 'model'

interface IProps {
    polyline: MResPolyline[],
    updateSave: (n: number) => void
}

function Polyline(props: IProps) {
    const { TextArea } = Input
    const [CurData, setCurData] = useState<MResPolyline[]>([])
    const [HeaderText, setHeaderText] = useState<string>("")
    //const user = useSelector(state => state.user)
    const [Date, setDate] = useState<string>("")
    const [Title, setTitle] = useState<string>("")
    const [UseFlag, setUseFlag] = useState(false)
    const [Name, setName] = useState<string>("")
    const [StartTime, setStartTime] = useState<Moment.Moment>()
    const [EndTime, setEndTime] = useState<Moment.Moment>()
    const [Description, setDescription] = useState<string>("")
    const [ImgPath, setImgPath] = useState<string[]>([])


    useEffect(() => {
        setCurData(props.polyline)
    }, [props.polyline])

    useEffect(() => {
        if(CurData) {
            const tempIdx = get(CurData[0], 'index', '항목을 선택하세요')            
            setHeaderText(`# ${tempIdx}`)
            setDate(get(CurData[0], 'date'))
            setTitle(get(CurData[0], 'title'))
            setUseFlag(get(CurData[0], 'useFlag', false))
            setName(get(CurData[0], 'name'))            
            setStartTime(Moment(get(CurData[0], 'startTime', '00:00:00')))
            setEndTime(Moment(get(CurData[0], 'endTime', '00:00:00')))
            setDescription(get(CurData[0], 'description'))
            setImgPath(get(CurData[0], 'image'))
        }
    }, [CurData])


    const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() //확인눌렀을때 화면을 다시 그리지 않게 해줌
        const putStartTime = Date + " " + Moment(StartTime).format('HH:mm:ss')
        const putEndTime = Date + " " + Moment(EndTime).format('HH:mm:ss')
        const body : MReqPolyline = {
            id: get(CurData[0], '_id'),
            title: Title,
            useFlag: UseFlag,
            name: Name,
            startTime: putStartTime,
            endTime: putEndTime,
            description: Description,
            image:ImgPath
        }
        const res = await ApiService.dataUpdate(body)
        if(res.success){
            setCurData(res.timelineInfo)
            props.updateSave(get(CurData[0], 'index'))
            alert('데이터를 저장하였습니다!')
        } else{
            alert('데이터 저장에 실패했습니다!')
        }        
    }

    const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const handleFlagChange = () => {
        setUseFlag(!UseFlag)
    }

    const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const stChangeHandler = (time: Moment.Moment) => {
        setStartTime(time)
    }

    const etChangeHandler = (time: Moment.Moment) => {
        setEndTime(time)
    }

    const descChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value)
    }

    const updateImgHandler = (newImgPath: string[]) => {
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
                            <div style={{display: 'inline-block', float:'left', width:'25%'}}>
                                Start Time
                            </div>
                            <div style={{display: 'inline-block', float:'left', width:'25%'}}>
                                <TimePicker
                                    value={StartTime}
                                    onChange={stChangeHandler}
                                />
                            </div>
                            <div style={{display: 'inline-block', float:'left', width:'25%'}}>
                                End Time
                            </div>
                            <div style={{display: 'inline-block', float:'left', width:'25%'}}>
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
