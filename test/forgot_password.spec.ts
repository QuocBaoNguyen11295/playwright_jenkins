import {test, expect} from '@playwright/test'
import {open_index_page,click_on_signin_button,check_open_login_page_successfully} from '../helpers/helper'
test.describe.parallel('Forgot password @forgot_password',()=>{
    test.beforeEach(async({page})=>{
        await test.step('Open index page',async()=>{
            await open_index_page(page)
        })
    })

    test('Send request to get back password to the email',async({page})=>{
        await test.step('Click on Signin button',async()=>{
            await click_on_signin_button(page)
        })

        await test.step('Open login page successfully',async()=>{
            await check_open_login_page_successfully(page)
        })

        await test.step('Click on Forgot Password link',async()=>{
            const forgot_password_link = await page.locator('a:text("Forgot your password ?")')
            await forgot_password_link.isEnabled()
            await forgot_password_link.click()
        })

        await test.step('Check forgot password page is opened',async()=>{
            const header = await page.locator('h3')
            const paragraph = await header.locator('..').locator('..').locator('p')
            await Promise.all([
                expect(header).toHaveText('Forgotten Password'),
                expect(paragraph).toContainText('So you forgot your password? Give us your email address and we will email it to you.')
            ])
        })

        await test.step('Fill out the email to get back the password',async()=>{
            const label_email = await page.locator('label:text("Email")')
            const email_field = await label_email.locator('..').locator('input')
            await Promise.all([
                label_email.isVisible(),
                email_field.isVisible(),
                email_field.fill('nqb@gmail.com')
            ])
        })

        await test.step('Click on Send Password',async()=>{
            const button = await page.locator('input[value="Send Password"]')
            await button.isEnabled()
            await button.click()
        })

        await test.step('Send email to get back the password',async()=>{
            const header = await page.locator('h3')
            const paragraph = await header.locator('..').locator('..').locator('..').locator('.offset3')
            await expect(header).toHaveText('Forgotten Password')
            await expect(paragraph).toContainText('Your password will be sent to the following email: nqb@gmail.com')
        })
    })
})