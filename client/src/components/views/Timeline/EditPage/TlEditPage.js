import React, { useEffect, useState } from 'react'
import Map from '../../../utils/Map'
import UCalendar from '../../../utils/UCalendar'
import Polyline from '../EditPage/Polyline'
import PolylineList from '../EditPage/PolylineList'
import axios from 'axios'
import Moment from 'moment'
import { useSelector } from "react-redux";
import './CTlEditPage.css'

/*

    CurDate[Date]: UCalendar에서 선택한 날짜를 담고 있음
    CurPolylineList[Array]: polyline API 호출해서 나온 데이터를 담고 있음
    SelectedLine[Number]: Map이나 List에서 선택한 라인의 Index를 담고있음

    onSetCurDate: 캘린더에서 선택한 날짜의 Handler
    onSetPolylineList: Map에서 올린 PolylineData를 담는 Handler
    onSetLine: Map이나 List에서 올린 라인의 Index를 담는 Handler

    loadPolylineList: Calendar에서 선택된 날짜에 의해 변경되면, polyline API 호출
*/
function TlEditPage(props) {
    const [CurDate, setCurDate] = useState(new Date())
    const [CurPolylineList, setCurPolylineList] = useState([])
    const [CalendarDate, setCalendarDate] = useState([])
    const [SelectedLine, setSelectedLine] = useState(0)
    const [UpdateData, setUpdateData] = useState()
    const user = useSelector(state => state.user)

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

    const loadCalendar = () => {
        const body = {
            owner: user.userData._id
        }    
        axios.post('/api/calendar', body)
        .then(response => {
            if(response.data.success && response.data.calendarInfo.length !== 0){
                setCalendarDate(response.data.calendarInfo[0].date)
            } else {
                //alert("달력 데이터를 가져오는데 실패했습니다")
            }
        })
    }
    
    const loadPolylineList = () => {
        const body = {
            owner: user.userData._id
        } 
        let inputDate = Moment(CurDate).format('YYYY-MM-DD')
        axios.post(`/api/polyline/datas?date=${inputDate}`, body)
        .then(response => {
            //console.log('polylineInfo >> ', response.data.polylineInfo)
            if(response.data.success){
                setCurPolylineList(response.data.polylineInfo)
            } else {
                alert("데이터를 가져오는데 실패했습니다")
            }
        })
    }

    const onSetCurDate = (newCurDate) => {
        setCurDate(newCurDate)
    }

    const onSetLine = (newIdx) => {
        setSelectedLine(newIdx)
    }

    const onSetCalendar = (newCalendar) => {
        setCalendarDate(newCalendar)
    }

    const onSaveHandler = (newIdx) => {
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
