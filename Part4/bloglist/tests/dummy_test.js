const supertest = require('supertest')
const {test, describe, beforeEach, after} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const app = require('../app')
const Blog = require('../models/blog')
const {initialBlogs} = require('./test_helper')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    blogsObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogsObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe("when blogs are initialized", () => {
    test('blogs are return as json', async () => {
        const response = await api
                            .get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)

    })

    test("there are same blogs as initial blogs", async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)

    })

    test('the unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(Boolean(response.body[0].id), true)
    })

})
describe('when add new blog', () => { 
    test('successed with valid data', async () => {
        const newBlog = {
            title: "test4",
            author: "yeweilun4",
            url: "www.yeweilun.com",
            likes: 100,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-type', /application\/json/)
        
        const blogs = await api.get('/api/blogs')
        assert.strictEqual(blogs.body.length, initialBlogs.length + 1)
    })

    test('the likes property is missing from the request then default to 0', async () => {
        const newBlog = {
            title: "test4",
            author: "yeweilun4",
            url: "www.yeweilun.com",
        }
        const response = await api
                        .post('/api/blogs')
                        .send(newBlog)
        
        assert.strictEqual(response.body.likes, 0)
    })

    test('the title or url properties are missing from the request data will fail', async () => {
        const newBlogWithoutTitle = {
            author: "yeweilun4",
            url: "www.yeweilun.com",
            likes: 100,
        }
        const newBlogWithoutUrl = {
            title: "test4",
            author: "yeweilun4",
            likes: 100,
        }
        await api
            .post('/api/blogs')
            .send(newBlogWithoutTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(newBlogWithoutUrl)
            .expect(400)
    })
})

describe('when delete a blog', () => {
    test('success deleted', async () => {
        const blogs = await api.get('/api/blogs')
        const toDeleteId = blogs.body[0].id
        await api
            .delete(`/api/blogs/${toDeleteId}`)
        const blogsAtEnd = await api.get('/api/blogs')
        assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length - 1)
    })
})

describe('when update a blog', () => {
    test('increase one like', async () => {
        const blogs = await api.get('/api/blogs')
        const toUpdateBlog = blogs.body[0]

        const UpdatedBlog = await api
                        .put(`/api/blogs/${toUpdateBlog.id}`)
                        .send({likes : toUpdateBlog.likes + 1})
                        .expect(200)
        
        assert.strictEqual(UpdatedBlog.body.likes, toUpdateBlog.likes + 1)
    })
})
describe('helper function test', () => {
    test('dummy returns one', () => {
    const result = listHelper.dummy(initialBlogs)
    assert.strictEqual(result, 1)
    })

    test('totalLikes', () => {
    const result = listHelper.totalLikes(initialBlogs)
    assert.strictEqual(result, 330)
    })

    test('favoriteBlog', () => {
        const result = listHelper.favoriteBlog(initialBlogs)
        assert.deepStrictEqual(result, initialBlogs[2])
    })
    
    test('mostBlogs', () => {
        const result = listHelper.mostBlogs(initialBlogs)
        const answer = {
            author: 'yeweilun3',
            blogs: 3
        }
        assert.deepStrictEqual(result, answer)
    })

    test('mostLikes', () => {
        const result = listHelper.mostLikes(initialBlogs)
        const answer = {
            author: 'yeweilun3',
            likes: 300
        }
        assert.deepStrictEqual(result, answer)
    })
})




after(async () => {
    await mongoose.connection.close()
})