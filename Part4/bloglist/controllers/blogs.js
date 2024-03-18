const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const {url, title, author, likes} = request.body
  const randomUser = await User.findOne({})
  const blog = {
    url, title, author, likes,
    user : randomUser._id

  }
  const blogToSave = new Blog(blog)
  const result = await blogToSave.save()
  if (!randomUser.blogs) {
    randomUser.blogs = []
  }
  randomUser.blogs = randomUser.blogs.concat(result._id)
  await randomUser.save()
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