import React from 'react'
import MCalendar from 'components/utils/MCalendar'
import MVerticalTimeline from 'components/utils/MVerticalTimeline'
import Map from 'components/utils/Map'
import './MainPage.scss'
import cx from 'classnames'
import { useTheme } from 'hooks/useTheme'

function MainPage() {
    const { isDarkMode } = useTheme()
    return (
        <div className={cx(isDarkMode ? 'main_dark' : 'main')}>
            <div className="main-title">
                <div>당신의 동선을 기록해보세요!</div>
                {/* <div>{process.env.REACT_APP_SERVER_HOST}</div> */}
                <MCalendar/>
            </div>
            <div className="left-area">
                <div style={{margin: '10px', display: 'inline-block'}}>
                    <Map
                        useSample={true}
                        size={window.innerWidth > 1300 ? 500 : 250}/>
                </div>
            </div>
            <div className="right-area">
                <MVerticalTimeline/>
            </div>
        </div>
    )
}

export default MainPage