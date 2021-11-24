import React, { useEffect, useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import MapIcon from '@material-ui/icons/Map'
import { useDispatch, useSelector } from 'react-redux'
import ImageSlider from '../utils/ImageSlider'
import MCard from '../utils/MCard'
import NoImage from '../../images/noImage.jpg'

function MVerticalTimeline() {
  const polyline = useSelector(state => state.polyline.polyline)
  const [isData, setIsData] = useState(false)

  useEffect(() => {
    if(polyline && polyline.length !== 0) setIsData(true)
    else setIsData(false)
    console.log('>>> polyline', polyline)
  }, [polyline])



    return (
        <div>
          {isData ? 
            <VerticalTimeline
              layout='1-column-left'
              lineColor='rgb(33, 150, 243)'
              >
              {polyline.map((cur) => (
                <>
                  {cur.useFlag === true ? 
                    <VerticalTimelineElement
                      key={cur._id}
                      className="vertical-timeline-element--work"
                      iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                      icon={<MapIcon />}
                      >
                        <div style={{height:'300px'}}>
                          <div style={{float:'left', width:'300px', margin: '10px' }}>
                            {cur.image.length !== 0 ? <ImageSlider images={cur.image}/> : 
                            <img src={NoImage} alt="No Images!"/>}
                          </div>
                          <div style={{float:'left',  width:'600px', margin: '10px'}}>
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
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/A00zLudc9EM" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
            </>}
        </div>
    )
}

export default MVerticalTimeline