const dummy = (blogs) => {
    return  1
}

const totalLikes = (blogs) => {
    return blogs.reduce((likes, currentValue) => likes + currentValue.likes, 0)
}

module.exports = {dummy, totalLikes}