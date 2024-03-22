const createUser = async (page, username, password) => {
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
  await page.getByText(`a new blog ${title} by ${author}`).waitFor()
}

module.exports = {createUser, createBlog}