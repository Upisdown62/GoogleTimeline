const mongoose = require('mongoose');
const Schema = mongoose.Schema

const timelineSchema = mongoose.Schema({
    owner: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    image:{
        type: Array,
        default: []
    },
    useFlag:{
        type:Boolean,
        default:true
    },
    placeId: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    point: {
        type: Array,
        default: []
    },
    name: {
        type: String,
        default: ""
    },
    startTime: {
        type: String,
        default: ""
    },
    endTime: {
        type: String,
        default: ""
    },
    activityType: {
        type: String,
        default: ""
    },
    index: {
        type: Number,
        default: 0
    },
    visitType: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const Timeline = mongoose.model('Timeline', timelineSchema);

module.exports = { Timeline }