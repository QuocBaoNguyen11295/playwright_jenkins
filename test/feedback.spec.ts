import {test,expect} from '@playwright/test'
import {open_index_page,open_tab_on_index_page} from '../helpers/helper'
test.describe.parallel('Feedback @feedback',()=>{
    test.beforeEach(async({page})=>{
        await test.step('Open index page',async()=>{
            await open_index_page(page)
        })

        await test.step('Open feedback tab',async()=>{
            await open_tab_on_index_page(page,'Feedback')
        })

        await test.step('Check feedback page is opened',async()=>{
            const header = await page.locator('h3')
            const paragraph1 = await page.locator('p:has(#faq-link)')
            const paragraph2 = await page.locator('p:below(#description)')
            await expect(header).toHaveText('Feedback')
            await expect(paragraph1).toContainText(`Our Frequently Asked Questions area will help you with many of your inquiries. \nIf you can't find your question, return to this page and use the e-mail form below.`)
            await expect(paragraph2).toContainText(`IMPORTANT! This feedback facility is not secure. Please do not send any \naccount information in a message sent from here.`)
        })
    })

    test('Send feedback',async({page})=>{
        await test.step('Fill out feedback',async()=>{
            const name_field = await page.locator('[placeholder="Your Name"]')
            await name_field.waitFor({state:"visible"})
            await name_field.fill('Quoc Bao Nguyen')
            const email_field = await page.locator('[placeholder="Your email address"]')
            await email_field.isVisible()
            await email_field.fill('nqb@gmail.com')
            const subject_field = await page.locator('[placeholder="Subject"]')
            await subject_field.isVisible()
            await subject_field.fill('test subject')
            const message_field = await page.locator('[placeholder="Type your questions here..."]')
            await message_field.isVisible(),
            await message_field.fill('Test Message')
        })
        
        await test.step('Click Send Message button',async()=>{
            const button = await page.locator('[value="Send Message"]')
            await button.isEnabled()
            await button.click()
        })

        await test.step('Check the message is displayed after sending the message',async()=>{
            const header = await page.locator('h3')
            const paragraph = await page.locator('.offset3')
            await Promise.all([
                expect(header).toHaveText('Feedback'),
                expect(paragraph).toContainText(`Thank you for your comments, Quoc Bao Nguyen. They will be reviewed by our Customer Service staff and given the full attention that they deserve.`)
            ])
        })
    })
})