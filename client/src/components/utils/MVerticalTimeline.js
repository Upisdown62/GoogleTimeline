import React, { useEffect, useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import MapIcon from '@material-ui/icons/Map'
import { useDispatch, useSelector } from 'react-redux'
import ImageSlider from '../utils/ImageSlider'
import MCard from '../utils/MCard'

function MVerticalTimeline() {
  const polyline = useSelector(state => state.polyline.polyline)
  const [isData, setIsData] = useState(false)
  const [images, setImages] = useState([])

  useEffect(() => {
    if(polyline && polyline.length !== 0) setIsData(true)
    else setIsData(false)
    console.log('>>> polyline', polyline)
  }, [polyline])

    useEffect(() => {
        const temp = []
        temp.push('uploads\\1636010197784_17ddc8b55a0a59f56f68ad13bc8b9ba9.jpg')
        temp.push('uploads\\1636010197836_Desert.jpg')
        temp.push('uploads\\1636010197862_fe78fc7d0374f00b2469f305e8437b19.jpg')
        temp.push('uploads\\1636010197864_placeimg_640_480_any.jpg')
        temp.push('uploads\\1636010197884_placeimg_640_800_any.jpg')
        setImages(temp)
    }, [])


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
                            <ImageSlider images={images}/>
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
            : <>유튜브 링크</>}
        </div>
    )
}

export default MVerticalTimeline