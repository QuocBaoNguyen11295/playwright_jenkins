import {test,expect} from '@playwright/test'
import { check_open_login_page_successfully, click_on_signin_button, login_user_to_open_online_banking, open_index_page, open_service_banking, open_tab_on_index_page } from '../helpers/helper'

test.describe.parallel('Find Transactions @find_transaction',()=>{
    test.beforeEach(async({page})=>{
        await test.step('Open index page',async()=>{
            await open_index_page(page)
        })

        await test.step('Click on Signin button',async()=>{
            await click_on_signin_button(page)
        })

        await test.step('check login page is opened',async()=>{
            await check_open_login_page_successfully(page)
        })

        await test.step('Login user to the page',async()=>{
            await login_user_to_open_online_banking(page)
        })

        await test.step('Open Online Banking tab on the index page',async()=>{
            await open_tab_on_index_page(page,'Online Banking')
        })

        await test.step('Open service Account Activity on the Online Banking',async()=>{
            await open_service_banking(page,'Account Activity')
        })

        await test.step('Check Account Activity tab is opened',async()=>{
            const tab = await page.locator('.ui-state-active')
            await expect(tab).toBeVisible()
            await expect(tab).toHaveText('Show Transactions')
        })
    })

    test('Fill out information for finding transaction',async({page})=>{
        await test.step('Click on Find Transaction tab',async()=>{
            const tab = await page.locator('a:text("Find Transactions")')
            await expect(tab).toBeVisible()
            await tab.click()
        })

        await test.step('Find out information',async()=>{
            const description_field = await page.locator('input:right-of(label:text("Description"))').first()
            await description_field.isEditable()
            await description_field.fill('ONLINE TRANSFER REF #UKKSDRQG6L')
            const date_from_field = await page.locator('input:right-of(label:text("Dates"))').first()
            await date_from_field.isEditable()
            await date_from_field.fill('2012-09-01')
            const date_to_field = await page.locator('input:right-of(label:text("To"))').first()
            await date_to_field.isEditable()
            await date_to_field.fill('2012-09-06')
            const amount_from_field = await page.locator('input:right-of(label:text("Amounts"))').first()
            await amount_from_field.isEditable()
            await amount_from_field.fill('700')
            const amount_to_field = await page.locator('input:right-of(label:text("To"))').last()
            await amount_to_field.isEditable()
            await amount_to_field.fill('2000')
            const type_field = await page.locator('select:right-of(label:text("Type"))').first()
            await type_field.isVisible()
            await type_field.selectOption({label:"Deposit"})

        })

        await test.step('Click on Find button',async()=>{
            const button = await page.locator('button:text("Find")')
            await button.isEnabled()
            await button.click()
        })

        await test.step('Check the table result',async()=>{
            const list_column = ['Date','Description','Deposit','Withdrawal']
            const thead_th = await page.locator('#filtered_transactions_for_account > table > thead > tr').locator('th')
            for(let i = 0;i < list_column.length;i++){
                await expect(thead_th.nth(i)).toHaveText(list_column[i])
            }
            const tbody_tr = await page.locator('#filtered_transactions_for_account > table > tbody').locator('tr')
            const list_length = await tbody_tr.count()
            let list_value = 
            [
                ['2012-09-06','ONLINE TRANSFER REF #UKKSDRQG6L',984.3,''],
                ['2012-09-01','ONLINE TRANSFER REF #UKKSDRQG6L',1000,'']
            ]

            for(let i = 0;i < list_length;i++){
                await expect(tbody_tr.nth(i).locator('td').first()).toHaveText(list_value[i][0].toString())
            }
        })
    })
})