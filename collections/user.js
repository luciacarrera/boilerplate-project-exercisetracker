const mongoose = require('../mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true }
})

const User = mongoose.model('User', userSchema)


saveNewUser = async (username) => {
    let userId
    const {_id: existingUserId} = await User.find({username})

    if(!existingUserId){
        const newUser = new User({username})
        const data = await newUser.save();
        userId = data._id
    }
    else userId = existingUserId
    
    return {username, _id: String(userId)} 
}

getAll = async() =>{
    const users = []
    const cursor = User.find({}).cursor();
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        users.push(doc)
    }
    return users
}


module.exports = {saveNewUser}