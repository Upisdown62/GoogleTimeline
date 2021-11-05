import React, { useEffect, useState } from 'react'
import MCalendar from '../../utils/MCalendar.js'
import MVerticalTimeline from '../../utils/MVerticalTimeline.js'
import axios from 'axios'

function MainPage() {
    const onUpdateClick = () => {

    }
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
                <MCalendar/>
            </div>
            <div style={{ marginTop: '80px'}}>
                <MVerticalTimeline/>
            </div>

        </div>
    )
}

export default MainPage