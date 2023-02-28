import {test,expect} from '@playwright/test'
import {open_index_page} from '../helpers/helper'
test.describe.parallel('Login feature @login',()=>{
    test.beforeEach(async({page})=>{
        await open_index_page(page)
    })

    test('The user logins successfully',async({page})=>{
        await test.step('Click on Signin button',async()=>{
            const button = await page.locator('button:text("Signin")')
            await button.isEnabled()
            await button.click()
        })

        await test.step('Check login page opened successfully',async()=>{
            const header = await page.locator('h3')
            await expect(header).toHaveText('Log in to ZeroBank')
        })

        await test.step('Fill out account for login',async()=>{
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
        })

        await test.step('Check user logins sucessfully',async()=>{
            const username_login = await page.locator('#settingsBox').locator('li').locator(`a:text("${process.env.account_username}")`)
            await expect(username_login).toBeVisible()
        })

        await test.step('Check user logouts from the page',async()=>{
            const username_login = await page.locator('#settingsBox').locator('li').locator('a:text("username")')
            await username_login.isEnabled()
            await username_login.click()

            const logout = await page.locator('#settingsBox').locator('li').locator('a:text("Logout")')
            await logout.isEnabled();
            await logout.click()
            
        })
    })

    test('The user logins unsuccessfully',async({page})=>{
        await test.step('Click on Signin button',async()=>{
            const button = await page.locator('button:text("Signin")')
            await button.isEnabled()
            await button.click()
        })

        await test.step('Check login page opened successfully',async()=>{
            const header = await page.locator('h3')
            await expect(header).toHaveText('Log in to ZeroBank')
        })

        await test.step('Fill out account for login',async()=>{
            const username_field = await page.locator('label:text-is("Login")').locator('..').locator('input')
            await username_field.isEditable()
            await username_field.fill('username1')

            const password_field = await page.locator('label:text-is("Password")').locator('..').locator('input')
            await password_field.isEditable()
            await password_field.fill('password1')

            const remember_me_box = await page.locator('label:text-is("Keep me signed in")').locator('..').locator('input')
            await remember_me_box.waitFor({state:"visible"})
            await remember_me_box.click()
            await remember_me_box.isChecked()

            const sign_in_button = await page.locator('input[value="Sign in"]')
            await sign_in_button.isEnabled()
            await sign_in_button.click()
        })

        await test.step('Check alert after logging',async()=>{
            const alert = await page.locator('.alert-error')
            await alert.isVisible()
            await expect(alert).toHaveText('Login and/or password are wrong.')
        })
    })
})