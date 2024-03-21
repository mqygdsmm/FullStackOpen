import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  test('at first, only show the title and author of a blog', () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 0,
      user: {
        username: 'test'
      }
    }

    const { container } = render(<Blog blog={blog} />)

    const element = screen.getByText('title author')
    screen.debug(element)
    expect(element).not.toHaveStyle('display: none')
    const details = container.querySelector('.blogDetails')
    expect(details).toHaveStyle('display: none')

  })
})
