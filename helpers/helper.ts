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

export async function login_user_to_open_online_banking(page) {
    const username_field = await page.locator('label:text-is("Login")').locator('..').locator('input')
    await username_field.isEditable()
    await username_field.fill(`${process.env.account_username}`)
    const password_field = await page.locator('label:text-is("Password")').locator('..').locator('input')
    await password_field.isEditable()
    await password_field.fill(`${process.env.account_password}`)
    const remember_me_box = await page.locator('label:text-is("Keep me signed in")').locator('..').locator('input')
    await remember_me_box.waitFor({state:"visible"})
    await remember_me_box.click()
    await remember_me_box.isChecked()

    const sign_in_button = await page.locator('input[value="Sign in"]')
    await sign_in_button.isEnabled()
    await sign_in_button.click()

    await open_index_page(page)
}

export async function open_tab_on_index_page(page,tabname) {
    const tab = await page.locator(`strong:text("${tabname}")`)
    await tab.waitFor({state: "visible"})
    await tab.click()
}

export async function open_service_banking(page,service_name) {
    const service = await page.locator(`span:text("${service_name}")`)
    await service.isEnabled()
    await service.click()
}