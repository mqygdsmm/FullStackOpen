const _ = require('lodash')

const dummy = (blogs) => {
    return  1
}

const totalLikes = (blogs) => {
    return blogs.reduce((likes, currentValue) => likes + currentValue.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((mostLiked, currentValue) => mostLiked.likes < currentValue.likes ? currentValue : mostLiked)
}

const mostBlogs = (blogs) => {
    const countByAuthor = _.countBy(blogs, 'author')
    const topAuthor = _.maxBy(_.keys(countByAuthor), (author) => countByAuthor[author])
    return {
        author: topAuthor,
        blogs: countByAuthor[topAuthor]
    }

}
module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs}