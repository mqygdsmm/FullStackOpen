const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name: 1, id: 1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({eror:'invalid token'})
  }
  const {url, title, author, likes} = request.body
  const user = await User.findById(decodedToken.id)
  const blog = {
    url, title, author, likes,
    user : user._id

  }
  const blogToSave = new Blog(blog)
  const result = await blogToSave.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const update = request.body
  const result = await Blog.findByIdAndUpdate(id, update, {new: true})
  response.json(result)
})

module.exports = blogRouter