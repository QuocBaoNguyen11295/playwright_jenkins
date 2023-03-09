import {test,expect} from '@playwright/test'
import { check_open_login_page_successfully, click_on_signin_button, login_user_to_open_online_banking, open_index_page, open_service_banking, open_tab_on_index_page } from '../helpers/helper'
test.describe.parallel('Purchase Foreign Currency @purchase_foreign_currency',()=>{
    test.beforeEach(async({page})=>{
        await test.step('Open index page',async()=>{
            await open_index_page(page)
        })

        await test.step('Click on Sigin button',async()=>{
            await click_on_signin_button(page)
        })
 
        await test.step('Check open login page',async()=>{
            await check_open_login_page_successfully(page)
        })
        
        await test.step('Login user',async()=>{
            await login_user_to_open_online_banking(page)
        })
        
        await test.step('Open Online Banking tab',async()=>{
            await open_tab_on_index_page(page,'Online Banking')
        })

        await test.step('Open Pay Bills service',async()=>{
            await open_service_banking(page,'Pay Bills')
        })

        await test.step('Check open pay bills tab',async()=>{
            const tab = await page.locator('.active')
            await expect(tab).toHaveText('Pay Bills')
        })
    })

    test('Open Purchase Foreign Currency and fill out information',async({page})=>{
        await test.step('Open Purchase Foreign Currency tab',async()=>{
            const tab = await page.locator('ul').locator('li:has(a:text("Purchase Foreign Currency"))')
            await tab.isEnabled()
            await tab.click()
        })

        await test.step('Fill out information for puchasing',async()=>{
            const currency = await page.locator('label:text("Currency")').locator('..').locator('select')
            await currency.selectOption({label:"Switzerland (franc)"})
            const sell_rate = await page.locator(`strong:text("Today's Sell Rate:")`).locator('..').locator('span')
            await expect(sell_rate).toHaveText(`1 franc (CHF) = 1.1383 U.S. dollar (USD)`)
            const amount = await page.locator('label:text("Amount")').locator('..').locator('#pc_amount')
            await amount.isEditable()
            await amount.fill('5000')
            const radio_usd = await page.locator('input:near(label:text("U.S. dollar (USD)"))').first()
            await radio_usd.click() 
        })

        await test.step('Click on Calculate Cost',async()=>{
            const button = await page.locator('input[value="Calculate Costs"]')
            await button.isEnabled()
            await button.click()
            const conversion_amount = await page.locator('label:near(label:text("Conversion Amount"))').first()
            await expect(conversion_amount).toHaveText(`4392.52 franc (CHF) = 5000.00 U.S. dollar (USD)`)
        })

        await test.step('Click on Purchase',async()=>{
            const button = await page.locator('input[value="Purchase"]')
            await button.isEnabled()
            await button.click()
            const alert_content = await page.locator('#alert_content')
            await alert_content.isVisible()
            await expect(alert_content).toHaveText('Foreign currency cash was successfully purchased.')
        })
    })
})