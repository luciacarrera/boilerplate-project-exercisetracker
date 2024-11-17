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
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  console.log(JSON.stringify(req.body))
  next();
});

app.post('/api/users',(request, response )=>{
  const user = new ExerciseTracker({username: request.body.username})
  console.log(user)
  user.save()
  .then(()=> {
    response.json({username: user.username, _id: String(user.id)})
  })
  .catch(() => {
    response.sendStatus(500)
  })
})

app.get('/api/users', (request, response) => {
  const exerciseTrackers = ExerciseTracker.find({})
  console.log(exerciseTrackers)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
