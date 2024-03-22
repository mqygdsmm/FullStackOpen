import { describe, test, beforeEach, expect } from '@playwright/test'
import { createBlog, createUser } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/user', {
      data: {
        username: 'yeweilun',
        name: 'mqyg',
        password: '546976125'
      }
    })

    await page.goto('http://localhost:5173')
  })
  test('display login form by default', async ({ page }) => {
    await expect(page.getByTestId('login')).toBeVisible()
  })

  describe('login', () => {
    test('success login in', async ({ page }) => {
      await createUser(page, 'yeweilun', '546976125')
      await expect(page.getByText('yeweilun logged in')).toBeVisible()
    })

    test('invalid credential will fail', async ({ page }) => {
      await createUser(page, 'yeweilun', 'wrong')
      await expect(page.getByText('invalid username or password')).toBeVisible()
    }) 
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await createUser(page, 'yeweilun', '546976125')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'test-title', 'test-author', 'test-url')
      await expect(page.getByText('a new blog test-title by test-author')).toBeVisible()
    })

    test('a blog can be edited', async ({ page }) => {
      await createBlog(page, 'test-title', 'test-author', 'test-url')
      await page.getByRole('button', {name: 'show'}).click()
      await page.getByRole('button', {name: 'Like'}).click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })

    test('a blog can be deleted by user who created it', async ({ page }) => {
      await createBlog(page, 'test-title', 'test-author', 'test-url')
      await page.getByRole('button', {name: 'show'}).click()
      page.on('dialog', async dialog => {await dialog.accept()})
      await page.getByRole('button', {name: 'remove'}).click()
      await expect(page.getByText('test-title test-author')).not.toBeVisible()
    })
  })
})