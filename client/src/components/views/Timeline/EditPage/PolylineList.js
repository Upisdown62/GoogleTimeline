import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import './CPolylineList.css'
import Moment from 'moment'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useSelector } from "react-redux";
import axios from 'axios'
import _ from 'lodash';

const columns = [
  {
    title: '순서',
    dataIndex: 'index',
    width: 70,
  },
  {
    title: '유형',
    dataIndex: 'type',
    width: 70,
  },
  {
    title: 'From',
    dataIndex: 'from',
    width: 100
  },
  {
    title: 'To',
    dataIndex: 'to',
    width: 100
  },
  {
    title: '방문장소',
    dataIndex: 'location'
  }
]

function PolylineList(props) {
  const [CurPolylineList, setCurPolylineList] = useState()
  const [CurDate, setCurDate] = useState()
  const [UseDateFlag, setUseDateFlag] = useState(false) //해당날짜 사용여부 체크필드
  const [DisableFlag, setDisableFlag] = useState(true) //데이터가 없으면 사용여부 체크필드를 비활성화
  const user = useSelector(state => state.user)

  useEffect(() => {
    const data = []
    props.polyline && props.polyline.map((cur) => {
      if(cur.visitType==="MOVE"){
        data.push({
          key: cur.index,
          index: cur.index,
          type: cur.activityType,
          from: Moment(cur.startTime).format('HH:mm:ss'),
          to: Moment(cur.endTime).format('HH:mm:ss'),
          location: '-'
        })
      } else{
        data.push({
          key: cur.index,
          index: cur.index,
          type: cur.visitType,
          from: Moment(cur.startTime).format('HH:mm:ss'),
          to: Moment(cur.endTime).format('HH:mm:ss'),
          location: cur.name
        })
      }
    })
    setCurPolylineList(data)
    if(data.length === 0) setDisableFlag(true)
    else setDisableFlag(false)
  }, [props.polyline]) 

  useEffect(() => {
    setCurDate(Moment(props.date).format('YYYY-MM-DD'))
    if(props.calendar){
      let findCalendar = props.calendar.filter((cur) => {
        if(cur.date === Moment(props.date).format('YYYY-MM-DD')) return true
      })
      if(findCalendar) {
        if(_.get(findCalendar[0], 'useFlag')) setUseDateFlag(true)
        else setUseDateFlag(false)
      }
    }
  }, [props.date])

  const onRowClickHandler = (state) => {
    props.updateSelectedIdx(state.index)
  }

  const handleChange = () => {
    setUseDateFlag(!UseDateFlag)

    const body = {
      owner: user.userData._id,
      date: CurDate,
      flag: !UseDateFlag
    }    
    axios.post('/api/calendar/update', body)
    .then(response => {
      if(response.data.success){
        console.log(response.data.calendarInfo.date)
        props.updateCalendar(response.data.calendarInfo.date)
      }
      else {
        alert("데이터 업데이트에 실패했습니다!")
      }
    })
  }

  return (
    <div>
      {CurPolylineList && 
        <div>
          <div className="header">
            <span className="header-date">
              {`날짜 : ${CurDate}`}
            </span>
            <span className="header-checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={UseDateFlag}
                    onChange={handleChange}
                    name="useDateFlag"
                    color="primary"
                    disabled={DisableFlag}
                  />
                }
                label="날짜 사용여부"
              />
            </span>
          </div>
          <div className="detail">
            <Table
              className="table-rows"
              columns={columns} 
              dataSource={CurPolylineList} 
              pagination={false}
              onRowClick={onRowClickHandler}
              scroll={{ y: 150 }} />
            </div>
          </div>
      }
    </div>

  );
}

export default PolylineList

/*

https://ant.design/components/table/#scroll

*/