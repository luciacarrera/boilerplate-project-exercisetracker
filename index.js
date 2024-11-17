require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const ExerciseTracker = require('./exercise-tracker')

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`\n\n${req.method} ${req.path} - ${req.ip}`);
  console.log(JSON.stringify(req.body))
  next();
});

app.post('/api/users',(request, response )=>{
  const user = new ExerciseTracker({username: request.body.username})
  user.save()
  .then(()=> {
    response.json({username: user.username, _id: String(user.id)})
  })
  .catch(() => {
    response.sendStatus(500)
  })
})

app.get('/api/users', (request, response) => {
  ExerciseTracker.find({}).then((trackers) => {
    response.json(trackers)
  }).catch(() => {
    response.sendStatus(500)
  })
})

app.post('/api/users/:_id/exercises', (request,response) => {
  const id = request.params._id
  const description = request.body.description
  const duration = Number(request.body.duration)
  let date = request.body.date

  if(!date) date = Date.now()
  date = new Date(date).toDateString()

  ExerciseTracker.findById(id)
    .then(tracker => {
      let log = tracker.log
      log = [...log, {date, duration, description}]
      console.log('log',log)
      ExerciseTracker.updateOne({_id: id}, {log})
        .then((updated) =>{ 
          response.json({_id: String(id), username: tracker.username, description, duration, date})    
        })
        .catch(() => {
          response.sendStatus(500)
        })
    })
})

app.get('/api/users/:_id/logs', (request, response) => {
  const {_id} = request.params
  const { from, to, limit} = request.query
  console.log(from, to, limit)
  ExerciseTracker.findById(_id)
    .then((tracker) => {
    if(from || to) tracker.log.map((exercise) => {
      if(date => from && date < to) return exercise
    })
    if(limit) tracker.log = tracker.log.slice(0, limit)
    response.json(tracker)})

})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
