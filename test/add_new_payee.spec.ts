import { expect,test } from "@playwright/test";
import {check_open_login_page_successfully, click_on_signin_button, login_user_to_open_online_banking, open_index_page,open_tab_on_index_page,open_service_banking} from '../helpers/helper'

test.describe.parallel('Add new payee @add_new_payee',()=>{
    test.beforeEach(async({page})=>{
        await test.step('Open index page',async()=>{
            await open_index_page(page)
        })

        await test.step('Click on signin button',async()=>{
            await click_on_signin_button(page)
        })

        await test.step('Check open login page',async()=>{
            await check_open_login_page_successfully(page)
        })

        await test.step('Login user',async()=>{
            await login_user_to_open_online_banking(page)
        })

        await test.step('Open tab Online Banking',async()=>{
            await open_tab_on_index_page(page,'Online Banking')
        })

        await test.step('Open service of Online Banking',async()=>{
            await open_service_banking(page,'Pay Bills')
        })

        await test.step('Check open pay bills tab',async()=>{
            const tab = await page.locator('.active')
            await expect(tab).toHaveText('Pay Bills')
        })
    })

    test('Fill out information and add new payee',async({page})=>{
        await test.step('Click on add new payee tab',async()=>{
            const tab = await page.locator('li:has(a:text("Add New Payee"))')
            await tab.isEnabled()
            await tab.click()
        })
        await test.step('Fill out information',async()=>{
            const payee_name_field = await page.locator('label:text("Payee Name")').locator('..').locator('input')
            await payee_name_field.isVisible()
            await payee_name_field.fill('Test 1')

            const payee_address_field = await page.locator('label:text("Payee Address")').locator('..').locator('textarea')
            await payee_address_field.isVisible()
            await payee_address_field.fill('Test message')

            const account_field = await page.locator('label:text("Account")').locator('..').locator('input')
            await account_field.isVisible()
            await account_field.fill('Test 2')

            const payee_details_field = await page.locator('label:text("Payee Details")').locator('..').locator('input')
            await payee_details_field.isVisible()
            await payee_details_field.fill('Test details')
        })

        await test.step('Click on Add button',async()=>{
            const button_add = await page.locator('[value="Add"]')
            await button_add.isEnabled()
            await button_add.click()
        })

        await test.step('Get the message after adding a new payee',async()=>{
            const message = await page.locator('#alert_content')
            await message.isVisible()
            await expect(message).toHaveText('The new payee Test 1 was successfully created.')
        })
    })
})