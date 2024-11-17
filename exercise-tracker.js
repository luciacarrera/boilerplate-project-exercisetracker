require('./mongo')
const mongoose = require('mongoose')

const exerciseTrackerSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        log: [{
            description: String,
            duration: Number,
            date: String
        }]
    },{ toJSON: {
        transform: function(document, returnedObject){
            delete returnedObject.__v
        },
        },
    },
)


const ExerciseTracker = mongoose.model('Exercise Tracker', exerciseTrackerSchema);

module.exports = ExerciseTracker