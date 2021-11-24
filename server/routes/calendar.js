const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer')
const { Calendar } = require('../models/Calendar')

//=================================
//             Calendar
//=================================


router.post('/', (req, res) =>{
    let userId = req.body.owner
    //console.log('>> userId',userId)
    Calendar.find({ owner: { $in: userId}})
        .exec((err, calendarInfo) => {
            //console.log('calendarInfo >> ', calendarInfo)
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({
                success:true,
                calendarInfo:calendarInfo
            })  
        })
})

router.post('/update', (req, res) =>{
    let userId = req.body.owner
    //console.log('>> userId',userId)
    Calendar.findOneAndUpdate(
        { owner: { $in: userId}, date:{$elemMatch:{date:req.body.date}}},
        { $set: {"date.$.useFlag":req.body.flag}},
        { new : true}, //업데이트된 정보를 다시 받을때 필요
        (err, calendarInfo) => {
            console.log('>>> calendarInfo\n', calendarInfo)
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({
                success:true,
                calendarInfo
            })
        })        
})

module.exports = router;
