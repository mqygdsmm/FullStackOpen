import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { expect } from 'vitest'


describe('<Blog />', () => {
  let container, likeHandler
  beforeEach(() => {
    likeHandler = vi.fn()
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 0,
      user: {
        username: 'test'
      }
    }
    container= render(<Blog blog={blog} like={likeHandler}/>).container
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

  test('press like button twice, the event handler is called twice', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)

    const likeButton = screen.getByText('Like')
    await user.dblClick(likeButton)
    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})


describe('<BlogForm />', () => {
  test('create new blog with right details', async () => {
    const user = userEvent.setup()
    const addNewBlog = vi.fn()
    const { container } = render(<BlogForm addNewBlog={ addNewBlog } />)

    await user.type(container.querySelector('#title'), 'test-title')
    await user.type(container.querySelector('#author'), 'test-author')
    await user.type(container.querySelector('#url'), 'test-url')
    expect(container.querySelector('#title')).toHaveValue('test-title')
    expect(container.querySelector('#author')).toHaveValue('test-author')
    expect(container.querySelector('#url')).toHaveValue('test-url')
    await user.click(screen.getByText('Create'))

    expect(addNewBlog.mock.calls).toHaveLength(1)
  })
})