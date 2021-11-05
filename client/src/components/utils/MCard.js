import React, { useEffect, useState } from 'react'
import { SmileOutlined, ReadOutlined, CompassOutlined, ScheduleOutlined } from '@ant-design/icons'
import './MCard.css'

function MCard(props) {
    const [body, setbody] = useState()
    // useEffect(() => {
    //     setbody({
    //         title: '제목은 여기입니다~',
    //         description: '여기서 찍은 사진이랑 뭐하고 있었네',
    //         address: '홍대 버거 맛집',
    //         startTime: '12:08:05',
    //         endTime: '13:08:05'
    //     })
    // }, [])

    useEffect(() => {
        setbody(props.polyline)
    }, [props.polyline])

    return (
        <>
        {body && 
        <div>
            <div className="block">
                <div className="icon">
                    <SmileOutlined />
                </div>
                <div className="data">{`: ${body.title}`}</div>
            </div>
            <div className="block">
                <div className="icon">
                    <ReadOutlined />
                </div>
                <div className="data">{body.description}</div>
            </div>
            <div className="block">
                <div className="icon">
                    <CompassOutlined />
                </div>
                <div className="data">{body.address}</div>
            </div>
            <div className="block">
                <div className="icon">
                    <ScheduleOutlined />
                </div>
                <div className="data">{`${body.startTime} ~ ${body.endTime}`}</div>
            </div>
        </div>
        }
        </>
    )
}

export default MCard