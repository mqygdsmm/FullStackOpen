import { describe, test, beforeEach, expect } from '@playwright/test'


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/user', {
      username: 'yeweilun',
      name: 'mqyg',
      password: '546976125qq'
    })

    await page.goto('http://localhost:5173')
  })
  test('display login form by default', async ({ page }) => {
    await expect(page.getByTestId('login')).toBeVisible()
  })
})