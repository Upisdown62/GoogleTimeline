import React, { useEffect, useState } from 'react'
import { SmileOutlined, ReadOutlined, CompassOutlined, ScheduleOutlined } from '@ant-design/icons'
import './MCard.css'
import { MResPolyline } from 'model'

interface IProps {
    polyline: MResPolyline
}
function MCard(props: IProps) {
    const [body, setbody] = useState<MResPolyline>()

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
                <div className="data">{`: ${body.description}`}</div>
            </div>
            <div className="block">
                <div className="icon">
                    <CompassOutlined />
                </div>
                <div className="data">{`: ${body.name}`}</div>
            </div>
            <div className="block">
                <div className="icon">
                    <ScheduleOutlined />
                </div>
                <div className="data">{`: ${body.startTime} ~ ${body.endTime}`}</div>
            </div>
        </div>
        }
        </>
    )
}

export default MCard