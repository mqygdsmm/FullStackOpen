import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  let container
  beforeEach(() => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 0,
      user: {
        username: 'test'
      }
    }
    container= render(<Blog blog={blog} />).container
  })

  test('at first, only show the title and author of a blog', () => {
    const element = screen.getByText('title author')
    expect(element).not.toHaveStyle('display: none')
    const details = container.querySelector('.blogDetails')
    expect(details).toHaveStyle('display: none')

  })

  test('after press show button, details show', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)

    const details = container.querySelector('.blogDetails')
    expect(details).not.toHaveStyle('display: none')
  })
})
