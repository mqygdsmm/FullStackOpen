import { describe, test, beforeEach, expect } from '@playwright/test'


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
      await page.getByTestId('username').fill('yeweilun')
      await page.getByTestId('password').fill('546976125')
      await page.getByRole('button', {name: 'Login'}).click()

      await expect(page.getByText('yeweilun logged in')).toBeVisible()
    })

    test('invalid credential will fail', async ({ page }) => {
      await page.getByTestId('username').fill('yeweilun')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', {name: 'Login'}).click()

      await expect(page.getByText('invalid username or password')).toBeVisible()
    }) 
  })
})