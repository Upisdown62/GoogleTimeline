import React, { useEffect, useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import MapIcon from '@material-ui/icons/Map'
import { useSelector } from 'react-redux'
import ImageSlider from './ImageSlider'
import MCard from './MCard'
import NoImage from '../../images/noImage.jpg'
import sampleData from 'mock/sampleData'
import './MVerticalTimeline.scss'
import { polylineSelector } from 'module/redux/polyline'
import { MResPolyline, MPolyline } from 'model'

function MVerticalTimeline() {
  const POLYLINE : MPolyline = useSelector(polylineSelector)
  const [isData, setIsData] = useState(false)

  useEffect(() => {
    if(POLYLINE && POLYLINE.polyline.length !== 0) setIsData(true)
    else setIsData(false)
  }, [POLYLINE])



    return (
        <div>
          {isData ? 
            <VerticalTimeline
              layout='1-column'
              lineColor='rgb(33, 150, 243)'
              >
              {POLYLINE.polyline.map((cur) => (
                <>
                  {cur.useFlag === true ? 
                    <VerticalTimelineElement
                      key={cur.index}
                      className="vertical-timeline-element--work"
                      iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                      icon={<MapIcon />}
                      >
                        <div style={{height:'300px'}}>
                          <div className="main-image-area">
                            {cur.image && cur.image.length !== 0 ? <ImageSlider images={cur.image}/> : 
                            <img src={NoImage} alt="No Images!"/>}
                          </div>
                          <div className="main-card-area">
                            <MCard
                              polyline={cur}
                              />
                          </div>
                        </div>
                    </VerticalTimelineElement>
                  : <></>}
                </>
              ))}
            </VerticalTimeline>
            : 
            <>
              <div>
                <div style={{margin: '10px', textAlign: 'center'}}>
                  샘플 데이터입니다!
                </div>
                <VerticalTimeline
                  layout='1-column'
                  lineColor='rgb(33, 150, 243)'>
                  {sampleData.map((cur) => (                    
                    <VerticalTimelineElement
                      key={cur.index}
                      className="vertical-timeline-element--work"
                      iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                      icon={<MapIcon />}>
                        <div style={{height:'300px'}}>
                          <div className="main-image-area">
                            <ImageSlider images={cur.image}/>
                          </div>
                          <div className="main-card-area">
                            <MCard
                              polyline={cur}
                            />
                          </div>
                        </div>
                    </VerticalTimelineElement>
                  ))}
                </VerticalTimeline>
              
              </div>
              {/* <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/A00zLudc9EM" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe> */}
            </>}
        </div>
    )
}

export default MVerticalTimeline