import React, { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import Moment from 'moment'
import Button from '@mui/material/Button'
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux'
import { loadPolyline } from 'module/redux/polyline'
import { ko } from 'date-fns/esm/locale'
import ApiService from '../../module/ApiService'
import "react-datepicker/dist/react-datepicker.css"
import { userSelector } from 'module/redux/user'
import { MUser } from 'model'


function MCalendar() {
    const dispatch = useDispatch()
    const user: MUser = useSelector(userSelector)

    const [HighlightArray, setHighlightArray] = useState<Date[]>([])
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleChange = (date: Date) => {
        setIsOpen(!isOpen)
        setStartDate(date)
    }
    // const handleClick = (e: React.MouseEventHandler<HTMLButtonElement>) => {
        //e.preventDefault()
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const load = async() => {
        let ownerId
        ownerId = _.get(user.userData, '_id')
        const body = {
            owner: ownerId
        }
        let inputDate = Moment(startDate).format('YYYY-MM-DD')
        const response = await ApiService.loadPolyline(inputDate, body)
        response.success && dispatch(loadPolyline(response.polylineInfo))
    }

    const loadHighlight = async() => {
        let ownerId
        ownerId = _.get(user.userData, '_id')
        if(ownerId) {
            const body = {
                owner: ownerId
            }
            const result = await ApiService.getCalendar(body)
            if(result.success && result.calendarInfo.length !== 0){
                let tempArray : Date[] = []
                result.calendarInfo[0].date.map((cur) => {
                    if(cur.useFlag) tempArray.push(new Date(cur.date))
                })
                setHighlightArray(tempArray)
            }
        }
    }

    useEffect(() => {
        user && user.userData && loadHighlight()
    }, [user])


    useEffect(() => {
        HighlightArray.filter((cur) => {
            if(Moment(cur).format('YYYY-MM-DD') === Moment(startDate).format('YYYY-MM-DD')) load()
        })
    }, [startDate])

    return (
        <div>
            <Button style={{width:'240px'}} variant="outlined" onClick={handleClick}>{Moment(startDate).format('yyyy-MM-DD')}</Button>
            {isOpen && (
                <DatePicker 
                    selected={startDate} 
                    onChange={handleChange} 
                    dateFormat="YYYY??? MM??? DD???"
                    locale={ko}
                    highlightDates={HighlightArray}
                    inline
                    showFullMonthYearPicker/>
            )}

        </div>
    );
}

export default MCalendar