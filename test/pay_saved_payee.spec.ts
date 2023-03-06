import {test,expect} from '@playwright/test'
import {open_index_page,click_on_signin_button, check_open_login_page_successfully, login_user_to_open_online_banking, open_tab_on_index_page, open_service_banking} from '../helpers/helper'
test.describe.parallel('Pay Saved Payee @pay_saved_payee',()=>{
    test.beforeEach(async({page})=>{
        await test.step('Open index page',async()=>{
            await open_index_page(page)
        })

        await test.step('Click on Signin button',async()=>{
            await click_on_signin_button(page)
        })

        await test.step('Check open page login successfully',async()=>{
            await check_open_login_page_successfully(page)
        })

        await test.step('Login to the page',async()=>{
            await login_user_to_open_online_banking(page)
        })

        await test.step('Open Online Banking tab',async()=>{
            await open_tab_on_index_page(page,'Online Banking')
        })

        await test.step('Open Pay bill service',async()=>{
            await open_service_banking(page,'Pay Bills')
        })

        await test.step('Check open pay bills tab',async()=>{
            const tab = await page.locator('.active')
            await expect(tab).toHaveText('Pay Bills')
        })
    })

    test('Click on pay saved payee',async({page})=>{
        await test.step('Click on Pay Saved Payee',async()=>{
            const tab = await page.locator('li:has(a:text("Pay Saved Payee"))')
            await tab.isEnabled()
            await tab.click()
        })

        await test.step('Check form title',async()=>{
            const header = await page.locator('#ui-tabs-1').locator('h2')
            await header.isVisible()
            await expect(header).toHaveText('Make payments to your saved payees')
        })

        await test.step('Fill out the information',async()=>{
            const payee_field = await page.locator('label:text("Payee")').locator('..').locator('select')
            await payee_field.selectOption({label:"Apple"})
            const account_field = await page.locator('label:text("Account")').locator('..').locator('select')
            await account_field.selectOption({label:"Loan"})
            const amount_field = await page.locator('label:text("Amount")').locator('..').locator('input')
            await amount_field.fill('50')
            const date_field = await page.locator('label:text("Date")').locator('..').locator('input')
            await date_field.fill('2021-01-01')
            const description_field = await page.locator('label:text("Description")').locator('..').locator('input')
            await description_field.fill('Test')
        })

        await test.step('Click on Pay',async()=>{
            const pay_button = await page.locator('[value="Pay"]')
            await pay_button.isEnabled()
            await pay_button.click()
        })

        await test.step('Check the message after clicking on Pay button',async()=>{
            const title = await page.locator('#alert_content').locator('span')
            await title.isVisible()
            await expect(title).toHaveAttribute('title','$ 50 payed to payee apple')
            await expect(title).toHaveText('The payment was successfully submitted.')
        })
    })
})