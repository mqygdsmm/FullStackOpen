const dummy = (blogs) => {
    return  1
}

const totalLikes = (blogs) => {
    return blogs.reduce((likes, currentValue) => likes + currentValue.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((mostLiked, currentValue) => mostLiked.likes < currentValue.likes ? currentValue : mostLiked)
}

module.exports = {dummy, totalLikes, favoriteBlog}