import {test,expect} from '@playwright/test'
import {open_index_page} from '../helpers/helper'

test.describe.parallel('Search keyword @search_keyword',()=>{
    test.beforeEach(async({page})=>{
        await test.step('Open index page',async()=>{
            await open_index_page(page)
        })
    })

    test('Type keyword and find it',async({page})=>{
        await test.step('Type keyword',async()=>{
            const search_box = await page.locator('[placeholder="Search"]')
            await search_box.isVisible()
            await search_box.fill('bank')
        })

        await test.step('Press Enter on the keyboard',async()=>{
            await page.keyboard.press('Enter')
        })

        await test.step('Check the results',async()=>{
            const header = await page.locator('h2')
            let result_list = await page.locator('ul').locator('li:text("bank")')
            await expect(header).toHaveText('Search Results:')
            const count_result_list = await result_list.count()
            for(let i = 0;i < count_result_list;i++){
                await expect(result_list.nth(i)).toBeVisible()
            }
        })
    })
})