const loginUser = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', {name: 'Login'}).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', {name: 'create new blog'}).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', {name: 'Create'}).click()
  await page.getByText(`${title} ${author}`).waitFor()
}


const createBlogByAPI = async (request, token, title, author, url, likes) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  await request.post('http://localhost:3003/api/blogs', {data: {title, author, url, likes}}, config)
}
const clickLike = async (page, text, times) => {
  await page.getByText(text).getByRole('button', {name: 'show'}).click()
  for (let i = 0; i < times; i++) {
    await page.getByRole('button', {name: 'Like'}).click()
    await page.getByText(text).getByText(`Likes: ${i + 1}`).waitFor()
  }
  await page.getByRole('button', {name: 'hide'}).click()
}
module.exports = {loginUser, createBlog, clickLike}