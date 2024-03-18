const User = require('../models/user')
const bcrypt = require('bcrypt')
const UserRouter = require('express').Router()


UserRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body
    const user = new User({
        username,
        name,
        password: await bcrypt.hash(password, 10)
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

UserRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = UserRouter
