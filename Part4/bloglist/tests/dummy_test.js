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

describe.only("backend api test", () => {
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

    test('create new blog', async () => {
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

    test('the likes property is missing from the request', async () => {
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

    test.only('the title or url properties are missing from the request data', async () => {
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