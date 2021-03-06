import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import { ko } from 'date-fns/esm/locale'
import "react-datepicker/dist/react-datepicker.css"
import { MCalendar, MUser } from 'model'


/*
  HighlightArray[Array]: calendar API 호출해서 데이터 있으면, 색상 표시 해주는 날짜를 담는 배열
  SelectedDate[Date]: 선택된 날짜를 담는 변수

  updateOnClickDate: props로 상위로 선택한 날짜를 올림

*/
interface IProps {
  calendar: MCalendar[],
  updateOnClickDate: (d: Date) => void,
  user: MUser
}

function UCalendar(props:IProps) {
  const [HighlightArray, setHighlightArray] = useState<Date[]>([])
  const [SelectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    props.updateOnClickDate(SelectedDate)
  }, [SelectedDate])

  useEffect(() => {
    if(props.calendar){
      let tempArray : Date[] = []
      props.calendar.map((cur) => {
        if(cur.useFlag) tempArray.push(new Date(cur.date))
      })
      setHighlightArray(tempArray)
    } 
  }, [props.calendar])
  
  return (
    <div>
      <DatePicker
        selected={SelectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        locale={ko}
        dateFormat="YYYY년 MM월 DD일"
        highlightDates={HighlightArray}
        inline
        />
    </div>
  )
}

export default UCalendar
/*
  https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md
  https://www.npmjs.com/package/react-datepicker
  https://reactdatepicker.com/#example-display-week-numbers
*/