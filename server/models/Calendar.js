const mongoose = require('mongoose');
const Schema = mongoose.Schema

const calendarSchema = mongoose.Schema({
    owner: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = { Calendar }