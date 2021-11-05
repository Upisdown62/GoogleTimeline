import React, { useState, useEffect, useRef } from 'react'
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api'

function Directions(props) {
    const [directions, setDirections] = useState()
    const { origin, destination } = props
    const count = useRef(0)

    const options = {
        polylineOptions: {
            strokeColor: "red",
            strokeWeight: 6,
            strokeOpacity: 0.8
        }
    }

    useEffect(() => {
        count.current = 0
        console.log(origin, destination)
    }, [origin.lat, origin.lng, destination.lat, destination.lng])

    const directionCallback = (result, status) => {
        console.log('directionCallback==>', result, status)
        if(status === 'OK' && count.current === 0){
            count.current += 1
            setDirections(result)
        }
    }

    return (
        <div>
            <DirectionsService
                options={{origin, destination, travelMode:'TRANSIT'}}
                callback={directionCallback}
            />
            <DirectionsRenderer 
                directions={directions}
                options={options}
            />            
        </div>
    )
}

export default Directions