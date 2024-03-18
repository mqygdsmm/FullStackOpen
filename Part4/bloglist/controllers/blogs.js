const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware') 

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name: 1, id: 1})
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const {url, title, author, likes} = request.body
  const user = request.user
  if (!user) {
    return response.status(401).json({eror:"invalid user"})
  }
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

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({eror:"invalid user"})
  }
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  }
  else {
    return response.status(401).json({eror:'unauthorized'})
  }
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const update = request.body
  const result = await Blog.findByIdAndUpdate(id, update, {new: true})
  response.json(result)
})

module.exports = blogRouter