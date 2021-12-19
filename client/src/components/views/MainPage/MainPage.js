import React, { useEffect, useState } from 'react'
import MCalendar from '../../utils/MCalendar.js'
import MVerticalTimeline from '../../utils/MVerticalTimeline.js'
import Map from '../../utils/Map.js'

function MainPage() {

    return (
        <div style={{width: '100%'}}>
            <div style={{ 
                textAlign: 'center' , 
                position: 'fixed', 
                width: '100%', 
                top: '69px',
                zIndex: 5,
                height: '80px',
                paddingTop: '10px',
                background: '#ffffff'}}>
                <div>당신의 동선을 기록해보세요!</div>
                <div>{process.env.REACT_APP_SERVER_HOST}</div>
                <MCalendar/>
            </div>
            <div className="left-area"
                style={{marginTop: '80px', width: '40%', float: 'left', 
                    textAlign: 'center',
                    position: 'fixed',
                    zIndex: 5}}>
                <div style={{margin: '10px', display: 'inline-block'}}>
                    <Map/>
                </div>
            </div>
            <div className="right-area"
                style={{marginTop: '80px', width: '60%', float: 'right'}}>
                <MVerticalTimeline/>
            </div>
        </div>
    )
}

export default MainPage