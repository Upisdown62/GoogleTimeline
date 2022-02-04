import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd'
import './CPolylineList.css'
import Moment from 'moment'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useSelector } from "react-redux"
import { get } from 'lodash'
import ApiService from 'module/ApiService'
import { userSelector } from 'module/redux/user'
import { MResPolyline, MListPolyline, MCalendar, MUser } from 'model'

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
    dataIndex: 'location',
    width: 140
  },
  {
    title: '사용여부',
    dataIndex: 'useFlag'
  }
]

interface IProps {
  polyline: MResPolyline[],
  calendar: MCalendar[],
  date: Date,
  updateSelectedIdx: (n : number) => void,
  updateCalendar: (d: Date) => void,
  updateSave: () => void
}

function PolylineList(props : IProps) {
  const [CurPolylineList, setCurPolylineList] = useState<MListPolyline[]>([])
  const [CurDate, setCurDate] = useState<string>()
  const [UseDateFlag, setUseDateFlag] = useState<boolean>(false) //해당날짜 사용여부 체크필드
  const [DisableFlag, setDisableFlag] = useState<boolean>(true) //데이터가 없으면 사용여부 체크필드를 비활성화
  const [allUpdateList, setAllUpdateList] = useState<string[] | number[]>([]) //일괄 비활성화를 위한 변수
  const user : MUser = useSelector(userSelector)

  useEffect(() => {
    const data : MListPolyline[] = []
    props.polyline && props.polyline.map((cur) => {
      if(cur.visitType==="MOVE"){
        data.push({
          key: cur._id,
          index: cur.index,
          type: cur.activityType,
          from: Moment(cur.startTime).format('HH:mm:ss'),
          to: Moment(cur.endTime).format('HH:mm:ss'),
          location: '-',
          useFlag: cur.useFlag ? 'True' : 'False'
        })
      } else{
        data.push({
          key: cur._id,
          index: cur.index,
          type: cur.visitType,
          from: Moment(cur.startTime).format('HH:mm:ss'),
          to: Moment(cur.endTime).format('HH:mm:ss'),
          location: cur.name,
          useFlag: cur.useFlag ? 'True' : 'False'
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
        if(cur.date.toString() === Moment(props.date).format('YYYY-MM-DD')) return true
      })
      if(findCalendar) {
        if(get(findCalendar[0], 'useFlag')) setUseDateFlag(true)
        else setUseDateFlag(false)
      }
    }
  }, [props.date])

  const onRowClickHandler = (state:any) => {
    props.updateSelectedIdx(state.index)
  }

  const onClickAllFalse = async() => {
    const res = await ApiService.dataUpdateFlag(allUpdateList)
    if(res.success){
        alert('데이터를 저장하였습니다!')
        props.updateSave()
    } else{
        alert('데이터 저장에 실패했습니다!')
    }
  }

  const handleChange = async() => {
    setUseDateFlag(!UseDateFlag)

    const body = {
      owner: user.userData._id,
      date: CurDate,
      flag: !UseDateFlag
    }    
    const res = await ApiService.updateCalendar(body)
    if(res.success){
      //console.log(response.data.calendarInfo.date)
      props.updateCalendar(res.calendarInfo.date)
    }
    else {
      alert("데이터 업데이트에 실패했습니다!")
    }
  }

  return (
    <div>
      {CurPolylineList && 
        <div>
          <div className="header">
            <span className="header-date">
              {`날짜 : ${CurDate}`}
            </span>
            <span>
              <Button type="default" onClick={onClickAllFalse}>
                  일괄비활성화
              </Button>
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
              rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys) => {
                  setAllUpdateList(selectedRowKeys)
                }
              }}
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

  )
}

export default PolylineList

/*

https://ant.design/components/table/#scroll

*/