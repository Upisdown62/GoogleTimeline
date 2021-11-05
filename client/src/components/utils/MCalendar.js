import React, { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import Moment from 'moment'
import Button from '@mui/material/Button'
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux'
import { loadPolyline } from '../../_actions/polyline_action'
import { ko } from 'date-fns/esm/locale'


function MCalendar() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
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
        let ownerId = '60ebc420fa93841d7042c1af'
        if(user.userData) ownerId = _.get(user.userData, '_id')
        const body = {
            owner: ownerId
        }
        let inputDate = Moment(startDate).format('YYYY-MM-DD')
        dispatch(loadPolyline(inputDate, body))
    }

    useEffect(() => {
        load()
    }, [user.userData, startDate])

    return (
        <div style={{margin: '10px'}}>
            <Button style={{width:'240px'}} variant="outlined" onClick={handleClick}>{Moment(startDate).format('yyyy-MM-DD')}</Button>
            {isOpen && (
                <DatePicker 
                    selected={startDate} 
                    onChange={handleChange} 
                    dateFormat="YYYY년 MM월 DD일"
                    locale={ko}
                    inline
                    showFullMonthYearPicker/>
            )}

        </div>
    );
}

export default MCalendar