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
            returnedObject.log.map(exercise => delete exercise._id)
            const count = returnedObject.log.length
            returnedObject.count = count
            returnedObject._id = String(returnedObject._id)
            console.log('returnedObject', returnedObject)
        },
        },
    },
)


const ExerciseTracker = mongoose.model('Exercise Tracker', exerciseTrackerSchema);

module.exports = ExerciseTracker