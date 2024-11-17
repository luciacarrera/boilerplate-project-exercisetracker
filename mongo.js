const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((error) => {console.log(error)})