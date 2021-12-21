/* global kakao */
import React, { useRef, useEffect, useState } from 'react'
import _ from 'lodash';
import { useSelector } from 'react-redux'
import sampleData from '../../mock/sampleData'

const { kakao } = window

/*
    placeId: nullable
    address: nullabe
    point Array: lat, lng 위도 경도
    name: nullable
    startTiem, endTime: Timestamp
    activityType: Stay면 null / WALKING BUS TRAIN ...
    index: index
    visitType: MOVE / STAY
*/

/*
    Map[Kakao Map]: Map 지도
    ReadData[Array]: API로 읽어온 데이터 저장해놓는 변수
    CurPolylineIdx[Number]: 마커나 라인 선택하였을때 index값을 저장
    PolylineList[Array]: 그려야하는 Polyline List
    MakerList[Array]: 그려야하는 Maker List


    updatePolyline: props 상위로 선택한 라인의 index를 올림
*/
const lineColor = {
    "WALKING": "#ffc952",
    "BUS":"#34314c",
    "SUBWAY":"#47b8e0",
    "RUNNING":"#99f19e",
    "ETC":"#ff7473"
}

const MAXLAT = 50
const MINLAT = 30
const MAXLNG = 140
const MINLNG = 120

function Map(props) {
    //const kakaoAPI = window.kakao.maps
    const [Map, setMap] = useState()
    const [CurData, setCurData] = useState()
    const [CurPolylineIdx, setCurPolylineIdx] = useState()
    const [MapFlag, setMapFlag] = useState(false)
    const [PolylineList, setPolylineList] = useState([])
    const [MarkerList, setMarkerList] = useState([])
    const container = useRef(null) //지도를 담을 영역의 DOM 레퍼런스
    const level = useRef(8)
    // const options = {
    //     //지도를 생성할 때 필요한 기본 옵션
    //     center: new kakaoAPI.LatLng(37.5559908, 126.9741218), //지도의 중심좌표.
    //     level: level.current, //지도의 레벨(확대, 축소 정도)
    // }
    const POLYLINE = useSelector(state => state.polyline.polyline)

    // useEffect(() => {
    //     setMap(new kakaoAPI.Map(container.current, options)) //지도 생성 및 객체 리턴
    // }, [])

    useEffect(() => {
        const container = document.getElementById("myMap")
		const options = {
			center: new kakao.maps.LatLng(37.5559908, 126.9741218),
			level: level.current, //지도의 레벨(확대, 축소 정도)
		}
        const map = new kakao.maps.Map(container, options)
        setMap(map)
    }, [])

    useEffect(() => {
        Map && props.useSample && setCurData(sampleData)
    }, [Map])

    useEffect(() => {
        setCurData(props.polyline)
    }, [props.polyline])

    useEffect(() => {
        POLYLINE && setCurData(POLYLINE)
    }, [POLYLINE])

    useEffect(() => {
        onClearMap()
    }, [CurData])

    useEffect(() => {
        onDrawMap()
    }, [MapFlag])

    useEffect(() => {
        if(CurPolylineIdx && props.polyline) {
            props.updateSelectedIdx(CurPolylineIdx)
        }
    }, [CurPolylineIdx])

    const onClearMap = () => {
        PolylineList.map((cur) => cur.setMap(null))
        MarkerList.map((cur) => cur.setMap(null))
        setPolylineList([])
        setMarkerList([])
        setMapFlag(!MapFlag)
    }
    
    const onCoordinateHandler = (x1, x2, y1, y2) => {
        var lat = (x2+x1)/2
        var lng = (y2+y1)/2
        var chkLevel = (x2-x1) > (y2-y1) ? (x2-x1) : (y2-y1)
        if(lat <= MAXLAT && lat >= MINLAT && lng >= MINLNG && lng <= MAXLNG) {
            var level            
            if(chkLevel < 0.007) level = 4
            else if(chkLevel < 0.015) level = 5
            else if(chkLevel < 0.05) level = 6
            else if(chkLevel < 0.09) level = 7
            else if(chkLevel < 0.15) level = 8
            else if(chkLevel < 0.3) level = 9
            else if(chkLevel < 0.9) level = 10
            else if(chkLevel < 2) level = 11
            else level = 12

            Map.setLevel(level)
            Map.setCenter(new kakao.maps.LatLng(lat, lng))
        }
    }
    const onTest = () => {
        Map.setLevel(2, {animate: true})
    }
    const onDrawMap = () => {
        let tempPolyline = []
        let tempMarker = []

        let minLat = 1000
        let maxLat = -1000
        let minLng = 1000
        let maxLng = -1000
        CurData && CurData.map((cur) => {
            //console.log(cur)
            if(!cur.useFlag) return
            if(cur.visitType === 'STAY'){
                let marker = new kakao.maps.Marker({
                    map: Map,
                    position: new kakao.maps.LatLng(cur.point[0].lat , cur.point[0].lng),
                    title: cur.name
                })
                maxLat = cur.point[0].lat > maxLat ? cur.point[0].lat : maxLat
                minLat = cur.point[0].lat < minLat ? cur.point[0].lat : minLat
                maxLng = cur.point[0].lng > maxLng ? cur.point[0].lng : maxLng
                minLng = cur.point[0].lng < minLng ? cur.point[0].lng : minLng

                kakao.maps.event.addListener(marker, 'click', function() {
                    setCurPolylineIdx(cur.index)
                })
                //marker.setMap(Map)
                tempMarker.push(marker)
            } else {
                let pathPoint = []
                cur.point.map((p) => {
                    pathPoint.push(new kakao.maps.LatLng(p.lat, p.lng))

                    maxLat = p.lat > maxLat ? p.lat : maxLat
                    minLat = p.lat < minLat ? p.lat : minLat
                    maxLng = p.lng > maxLng ? p.lng : maxLng
                    minLng = p.lng < minLng ? p.lng : minLng
                })
                
                let polylineColor// = '#' +  Math.round(Math.random() * 0xffffff).toString(16)
                switch (cur.activityType) {
                    case "WALKING":
                        polylineColor = _.get(lineColor, 'WALKING')
                        break
                    case "BUS":
                        polylineColor = _.get(lineColor, 'BUS')
                        break
                    case "SUBWAY":
                        polylineColor = _.get(lineColor, 'SUBWAY')
                        break
                    case "RUNNING":
                        polylineColor = _.get(lineColor, 'RUNNING')
                        break
                    case "ETC":
                        polylineColor = _.get(lineColor, 'ETC')
                        break
                    default:
                        break;
                }
                let polyline = new kakao.maps.Polyline({
                    map: Map,
                    path: pathPoint,
                    strokeWeight: 6,
                    strokeColor: polylineColor,
                    strokeOpacity: 1,
                    strokeStyle: 'solid',
                    endArrow: true
                })                
                
                kakao.maps.event.addListener(polyline, 'mouseover', function(mouseEvent) {  
                    polyline.setOptions({
                        strokeWeight: 10,
                        strokeColor: polylineColor,
                        strokeOpacity: 1,
                        strokeStyle: 'solid'
                    })       
                })
                
                kakao.maps.event.addListener(polyline, 'mouseout', function(mouseEvent) {  
                    polyline.setOptions({
                        strokeWeight: 6,
                        strokeColor: polylineColor,
                        strokeOpacity: 1,
                        strokeStyle: 'solid'
                    })
                })

                kakao.maps.event.addListener(polyline, 'click', function(mouseEvent) {  
                    setCurPolylineIdx(cur.index)        
                })
                tempPolyline.push(polyline)
            }
        })
        onCoordinateHandler(minLat, maxLat, minLng, maxLng)
        tempPolyline.map((cur) => cur.setMap(Map))
        tempMarker.map((cur) => cur.setMap(Map))
        setPolylineList(tempPolyline)
        setMarkerList(tempMarker)
    }

    return (
        <div>
            <div
                id="myMap"
                className="map"
                style={{ width: "500px", height: "500px" }}
                ref={container}
            ></div>
            {/* <button onClick={onTest}>
                테스트용
            </button> */}
        </div>
  )
}

export default Map


/*
Color 조합 참고 표 - https://www.webdesignrankings.com/resources/lolcolors/
https://gifguide2code.com/2018/02/12/json-how-to-read-your-google-location-data/

*/