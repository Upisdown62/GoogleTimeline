import React, { useEffect, useState } from 'react'
import Map from '../../../utils/Map'
import UCalendar from '../../../utils/UCalendar'
import Polyline from './Polyline'
import PolylineList from './PolylineList'
import Moment from 'moment'
import { useSelector } from "react-redux"
import './CTlEditPage.css'
import ApiService from 'module/ApiService'
import { userSelector } from 'module/redux/user'
import { MCalendar, MResPolyline, MUser } from 'model'

/*

    CurDate[Date]: UCalendar에서 선택한 날짜를 담고 있음
    CurPolylineList[Array]: polyline API 호출해서 나온 데이터를 담고 있음
    SelectedLine[Number]: Map이나 List에서 선택한 라인의 Index를 담고있음

    onSetCurDate: 캘린더에서 선택한 날짜의 Handler
    onSetPolylineList: Map에서 올린 PolylineData를 담는 Handler
    onSetLine: Map이나 List에서 올린 라인의 Index를 담는 Handler

    loadPolylineList: Calendar에서 선택된 날짜에 의해 변경되면, polyline API 호출
*/
interface IProps {
    user: MUser
}

function TlEditPage(props:IProps) {
    const [CurDate, setCurDate] = useState(new Date())
    const [CurPolylineList, setCurPolylineList] = useState<MResPolyline[]>([])
    const [CalendarDate, setCalendarDate] = useState<MCalendar[]>([])
    const [SelectedLine, setSelectedLine] = useState<number>(0)
    const [UpdateData, setUpdateData] = useState<MResPolyline[]>([])
    const user:MUser = useSelector(userSelector)

    useEffect(() => {
        user.userData && loadCalendar()
    }, [user])

    useEffect(() => {
        if(CurDate && user.userData) {
            loadPolylineList()
            setSelectedLine(0)
        }
    }, [CurDate])

    useEffect(() => {
        setUpdateData(CurPolylineList.filter((cur) => cur.index === SelectedLine))
    }, [SelectedLine])

    const loadCalendar = async() => {
        const body = {
            owner: user.userData._id
        }    
        const res = await ApiService.getCalendar(body)
        if(res.success && res.calendarInfo.length !== 0){
            setCalendarDate(res.calendarInfo[0].date)
        } else {
            //alert("달력 데이터를 가져오는데 실패했습니다")
        }
    }
    
    const loadPolylineList = async() => {
        const body = {
            owner: user.userData._id
        } 
        let inputDate = Moment(CurDate).format('YYYY-MM-DD')
        const res = await ApiService.loadPolyline(inputDate, body)
        //console.log('polylineInfo >> ', res.data.polylineInfo)
        if(res.success){
            setCurPolylineList(res.polylineInfo)
        } else {
            alert("데이터를 가져오는데 실패했습니다")
        }
    }

    const onSetCurDate = (newCurDate: Date) => {
        setCurDate(newCurDate)
    }

    const onSetLine = (newIdx: number) => {
        setSelectedLine(newIdx)
    }

    const onSetCalendar = (newCalendar: MCalendar[]) => {
        setCalendarDate(newCalendar)
    }

    const onSaveHandler = (newIdx: number) => {
        loadPolylineList()
        setSelectedLine(newIdx)
    }

    
    return (
        <div className="timeline-edit">
            <div className="first-edit-row">
                <div className="first-row-calendar">
                    <UCalendar
                        calendar={CalendarDate}
                        updateOnClickDate={onSetCurDate}
                        user={props.user}/>
                </div>
                <div className="first-row-list">
                    <PolylineList
                        polyline={CurPolylineList}
                        calendar={CalendarDate}
                        date={CurDate}
                        updateSelectedIdx={onSetLine}
                        updateCalendar={onSetCalendar}                        
                        updateSave={loadPolylineList}
                    />
                </div>
            </div>
            <div className="second-edit-row">
                <div className="second-row-map">
                    <Map
                        polyline={CurPolylineList}
                        updateSelectedIdx={onSetLine}
                        useSample={false}
                    />
                </div>
                <div className="second-row-data">
                    <Polyline
                        polyline={UpdateData}
                        updateSave={onSaveHandler}/>
                </div>
            </div>
        </div>
    )
}

export default TlEditPage
