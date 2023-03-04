import {expect} from '@playwright/test'
export async function open_index_page(page) {
    await page.goto('http://zero.webappsecurity.com/')
}

export async function click_on_signin_button(page) {
    const button = await page.locator('button:text("Signin")')
    await button.isEnabled()
    await button.click()
}

export async function check_open_login_page_successfully(page) {
    const header = await page.locator('h3')
    await expect(header).toHaveText('Log in to ZeroBank')
}

export async function open_tab_on_index_page(page,tabname) {
    const tab = await page.locator(`strong:text("${tabname}")`)
    await tab.waitFor({state: "visible"})
    await tab.click()
}