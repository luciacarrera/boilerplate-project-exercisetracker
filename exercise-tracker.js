require('./mongo')
const mongoose = require('mongoose')

const exerciseTrackerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    log: [{
        description: String,
        duration: Number,
        date: String
    }]
})

exerciseTrackerSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
    }
})

const ExerciseTracker = mongoose.model('Exercise Tracker', exerciseTrackerSchema);

module.exports = ExerciseTracker