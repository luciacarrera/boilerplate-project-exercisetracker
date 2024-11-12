const {saveNewUser} = require("./collections/user")

const sendUI = (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
}

const createNewUser = async (req, res) => {
    const data = await saveNewUser(req.body.username)
    res.json(data);
}

const getAllUsers = async (req,res) => {
    const allUsers = await getAllUsers()
    res.json(allUsers)
}

module.exports = {sendUI, createNewUser,getAllUsers}