import React from 'react'
import { Carousel } from 'antd'

function ImageSlider(props) {
    return (
        <Carousel 
            dotPosition={'top'}
            autoplay>
            {props.images.map((image, index) => (
                <div key={index}>
                    <img style={{width:'100%', maxHeight:'300px'}}
                        src={`http://localhost:5000/${image}`}/>
                </div>
            ))}
        </Carousel>
    )
}

export default ImageSlider
