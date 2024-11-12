const express = require('express')
const app = express()
const cors = require('cors')
const { sendUI,createNewUser, getAllUsers } = require('./routeHandlers')
const bodyParser = require('body-parser');

require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', sendUI);

app.post('/api/users', createNewUser )
app.get('/api/users', getAllUsers )



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
