import React from 'react'
import MCalendar from '../../utils/MCalendar.js'
import MVerticalTimeline from '../../utils/MVerticalTimeline.js'
import Map from '../../utils/Map.js'
import './MainPage.css'

function MainPage() {

    return (
        <div className="main">
            <div className="main-title">
                <div>당신의 동선을 기록해보세요!</div>
                {/* <div>{process.env.REACT_APP_SERVER_HOST}</div> */}
                <MCalendar/>
            </div>
            <div className="left-area">
                <div style={{margin: '10px', display: 'inline-block'}}>
                    <Map
                        useSample={true}/>
                </div>
            </div>
            <div className="right-area">
                <MVerticalTimeline/>
            </div>
        </div>
    )
}

export default MainPage