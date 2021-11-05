const mongoose = require('mongoose');

const pointXYSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        ref: 'Timeline'
    },
    lat: {
        type: Number,
        default: 0
    },
    lng: {
        type: Number,
        default: 0
    }   
}, { timestamps: true })

const PointXY = mongoose.model('PointXY', pointXYSchema);

module.exports = { PointXY }