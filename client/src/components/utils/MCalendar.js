import React, { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import Moment from 'moment'
import Button from '@mui/material/Button'
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux'
import { loadPolyline } from '../../_actions/polyline_action'
import { ko } from 'date-fns/esm/locale'
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css"


function MCalendar() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [HighlightArray, setHighlightArray] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false)
    const handleChange = (e) => {
        setIsOpen(!isOpen)
        setStartDate(e)
    }
    const handleClick = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }

    const load = () => {
        let ownerId // = '60ebc420fa93841d7042c1af'
        ownerId = _.get(user.userData, '_id')
        const body = {
            owner: ownerId
        }
        let inputDate = Moment(startDate).format('YYYY-MM-DD')
        dispatch(loadPolyline(inputDate, body))
    }

    useEffect(() => {
        let ownerId // = '60ebc420fa93841d7042c1af'
        ownerId = _.get(user.userData, '_id')
        const body = {
            owner: ownerId
        }
        ownerId && axios.post('/api/calendar', body)
        .then(response => {
            if(response.data.success && response.data.calendarInfo.length !== 0){
                let tempArray = []
                response.data.calendarInfo[0].date.map((cur) => {
                    if(cur.useFlag) tempArray.push(new Date(cur.date))
                })
                setHighlightArray(tempArray)
            } else {
                alert("달력 데이터를 가져오는데 실패했습니다")
            }
        })
    }, [user.userData])


    useEffect(() => {
        HighlightArray.filter((cur) => {
            if(Moment(cur).format('YYYY-MM-DD') === Moment(startDate).format('YYYY-MM-DD')) load()
        })
    }, [startDate])

    return (
        <div style={{height: '270px'}}>
            <Button style={{width:'240px'}} variant="outlined" onClick={handleClick}>{Moment(startDate).format('yyyy-MM-DD')}</Button>
            {isOpen && (
                <DatePicker 
                    selected={startDate} 
                    onChange={handleChange} 
                    dateFormat="YYYY년 MM월 DD일"
                    locale={ko}
                    highlightDates={HighlightArray}
                    inline
                    showFullMonthYearPicker/>
            )}

        </div>
    );
}

export default MCalendar