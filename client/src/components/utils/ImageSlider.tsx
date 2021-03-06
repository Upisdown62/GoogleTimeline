import React from 'react'
import { Carousel } from 'antd'

interface IProps{
    images: string[]
}

function ImageSlider(props : IProps) {
    return (
        <Carousel 
            dotPosition={'top'}
            autoplay>
            {props.images.map((image, index) => (
                <div key={index}>
                    <img style={{ width: window.innerWidth > 1300 ? '300px' : '200px'}}
                        src={`${image}`} alt=''/>
                </div>
            ))}
        </Carousel>
    )
}

export default ImageSlider
