const express = require('express')
const router = express.Router();
const multer = require('multer')
const fs = require('fs')
const moment = require("moment")
const { User } = require("../models/User")
const { Timeline } = require('../models/Timeline')
const { Calendar } = require('../models/Calendar')
const lodash = require('lodash')
const mongoose = require('mongoose')


//=================================
//             Polyline
//=================================

router.post('/datas', (req, res) =>{
    let userId = req.body.owner
    let inputDate = req.query.date
    
    //console.log('==> inputDate', inputDate)

    Timeline.find({ owner: { $in: userId}, date: inputDate})
        .exec((err, polylineInfo) => {
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({
                success:true,
                polylineInfo:polylineInfo
            })
        })
})

router.post('/', (req, res) => {
    //console.log('=====', req.body)

    return res.status(200).json({
        success: true
    })
})


/**
 * https://www.a-mean-blog.com/ko/blog/%EB%8B%A8%ED%8E%B8%EA%B0%95%EC%A2%8C/_/Node-JS-Multer%EB%A1%9C-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C
 */

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
})
   
var upload = multer({ storage: storage }).array("file", 10)

router.post('/image', (req, res) => {
    //가져온 이미지 저장
    upload(req, res, err => {
        if(err){
            return res.status(400).json({ success:false, err})
        }
        return res.status(200).json({
            success:true, 
            files: req.files
        })
    })
})

var storageJson = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploadsjson')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
})
   
var uploadJson = multer({ storage: storageJson }).array("file", 100)

router.post('/vaildation', (req, res) => {
    uploadJson(req, res, err => {
        //console.log('======================', req.files)
        if(err){
            return res.status(400).json({ success:false, err})
        }

        return res.status(200).json({
            success:true, 
            files: req.files
        })
    })
})


router.post('/save', (req, res) => {
    //console.log('>>> ', req.body)

    let uploadCnt = 0
    let calendarDate = []
    req.body.filePath.map((file) => {
        const readData = fs.readFileSync(file, 'utf8')
        const data = JSON.parse(readData)

        //console.log('data >> ', data.timelineObjects)

        data.timelineObjects.map((cur, index) => {
            let data = {
                "owner":req.body.userId,
                "image":[],
                "title":"",
                "description":"",
                "useFlag":true,
                "index":index+1
            }
            if(cur.activitySegment !== undefined){ 
                let trackPoint = []
                trackPoint.push({
                    "lat":cur.activitySegment.startLocation.latitudeE7/10000000,
                    "lng":cur.activitySegment.startLocation.longitudeE7/10000000})
                
                cur.activitySegment.simplifiedRawPath &&
                cur.activitySegment.simplifiedRawPath.points.map((pnt) => {
                    trackPoint.push({
                        "lat":pnt.latE7/10000000,
                        "lng":pnt.lngE7/10000000,
                    })
                })

                trackPoint.push({
                    "lat":cur.activitySegment.endLocation.latitudeE7/10000000,
                    "lng":cur.activitySegment.endLocation.longitudeE7/10000000})

                data = {...data,
                    "date":calcDate(cur.activitySegment.duration.startTimestampMs),
                    "placeId":"",
                    "address":"",
                    "point":trackPoint,
                    "name":"",
                    "startTime":calcDateTime(cur.activitySegment.duration.startTimestampMs),
                    "endTime":calcDateTime(cur.activitySegment.duration.endTimestampMs),
                    "activityType":cur.activitySegment.activityType,
                    "visitType":"MOVE"
                    }
                //console.log("=========activitySegment======\n", body)
            } else {
                let trackPoint = []
                trackPoint.push({
                    "lat":cur.placeVisit.location.latitudeE7/10000000,
                    "lng":cur.placeVisit.location.longitudeE7/10000000})

                data = {...data,
                    "date":calcDate(cur.placeVisit.duration.startTimestampMs),
                    "placeId":cur.placeVisit.location.placeId,
                    "address":cur.placeVisit.location.address,
                    "point":trackPoint,
                    "name":cur.placeVisit.location.name,
                    "startTime":calcDateTime(cur.placeVisit.duration.startTimestampMs),
                    "endTime":calcDateTime(cur.placeVisit.duration.endTimestampMs),
                    "activityType":"",
                    "visitType":"STAY"
                    }
                
            }
            
            const timeline = new Timeline(data)        
            timeline.save((err) => {
                if (err) return res.status(400).json({ success: false, err })
            })
            //save도 비동기돌고 있는것 같아서 사실 이렇게하면 안됨
            uploadCnt += 1

            calendarDate.push({
                "date":data.date,
                "useFlag":true
            })
        })
    })    
    //calendar에 user Id로 찾아서 이미 있는지 보고, 있으면 푸시/없으면 생성
    let findCalendarInfo = []
    Calendar.find(
        { owner: req.body.userId },
        (err, calendarInfo) => {
            console.log('calendarInfo >>', calendarInfo)
            if (err) return res.status(400).json({ success: false, err })
                        
            if(calendarInfo.length === 0){
                calendarDate = lodash.uniqBy(calendarDate, 'date')
                const calendarBody = {
                    "owner":req.body.userId,
                    "date":calendarDate
                }
                const calendar = new Calendar(calendarBody)        
                calendar.save((err) => {
                    if (err) return res.status(400).json({ success: false, err })
                })
            } else {
                findCalendarInfo = calendarInfo[0].date
                calendarDate.forEach((cur) => (
                    findCalendarInfo.push(cur)
                ))
                findCalendarInfo = lodash.uniqBy(findCalendarInfo, 'date')
                Calendar.findOneAndUpdate(
                    { owner: req.body.userId }, 
                    { date: findCalendarInfo },
                    { new : true }, //업데이트된 정보를 다시 받을때 필요
                    (err, calendarInfo) => {
                        if (err) return res.status(400).json({ success: false, err })
                    })
            }
        
            return res.status(200).json({
                success:true,
                successCnt: uploadCnt
            })
    })
})

router.post('/update', (req, res) => {
    let id = req.body.id
    //console.log('>> id',id)

    Timeline.findOneAndUpdate(
        { _id: { $in: id}},
        { $set: { "title":req.body.title, 
                    "useFlag": req.body.useFlag,
                    "name": req.body.name,
                    "startTime": req.body.startTime,
                    "endTime": req.body.endTime,
                    "description":req.body.description, 
                    "image":req.body.image}},
        { new : true },
        (err, timelineInfo) => {
            console.log(timelineInfo)
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({
                success:true,
                timelineInfo
            })
        })
})

router.post('/updateFlag', (req, res) => {
    let body = req.body
    let idList = []
    body.map((cur) => (
        idList.push(mongoose.Types.ObjectId(cur))
    ))
    Timeline.bulkWrite(
        body.map((cur) => ({
            updateOne:{
                filter: { _id: cur},
                update: { $set: {"useFlag": false}}
            }
        })),
        (err, timelineInfo) => {
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({
                success:true,
                timelineInfo
            })
        }
    )
})
const calcDate = (timestamp) => {
    return moment(Number(timestamp)).format('YYYY-MM-DD') 
}
const calcDateTime = (timestamp) => {
    return moment(Number(timestamp)).format('YYYY-MM-DD HH:mm:ss')
}


module.exports = router;
