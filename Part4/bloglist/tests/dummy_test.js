const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
    {
        title: "test",
        author: "yeweilun",
        url: "www.yeweilun.com",
        likes: 10,
        id: "65f3a1ee21e4bfb12784bced"
    },
    {
        title: "test2",
        author: "yeweilun2",
        url: "www.yeweilun.com",
        likes: 20,
        id: "65f3abd5af898fe9df63afc5"
    },
    {
        title: "test3",
        author: "yeweilun3",
        url: "www.yeweilun.com",
        likes: 100,
        id: "65f3af4d97887b3565efcacd"
    }
]


describe('listHelper', () => {
    test('dummy returns one', () => {
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
    })

    test('totalLikes', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 130)
    })
})