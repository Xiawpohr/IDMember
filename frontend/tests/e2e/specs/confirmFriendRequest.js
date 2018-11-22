const BASE_URL = process.env.VUE_DEV_SERVER_URL

module.export = {
  before: browser => {
    browser
      .url(`${BASE_URL}/login`)
      .waitForElementVisible('#app')
      .clearValue('input[aria-label="E-mail"]')
      .setValue('input[aria-label="E-mail"]', 'test@example.com')
      .clearValue('input[aria-label="Password"]')
      .setValue('input[aria-label="Password"]', 'Aa=123')
      .click('button[type="submit"]')
      .pause(500)
      .assert.urlEquals(`${BASE_URL}/`)
  },
  after: browser => {
    browser
      .url(`${BASE_URL}/profile`)
      .waitForElementVisible('#app')
      .click('#log-out')
      .pause(500)
      .assert.urlEquals(`${BASE_URL}/login`)
      .end()
  },
  'Confirm a friend request': browser => {
    browser
      .click('a[href="/"]')
      .waitForElementVisible('#app')
      .assert.urlEquals(`${BASE_URL}/`)
      .saveScreenshot('./tests/e2e/screenshots/confirm_friends.png')
      .useXpath()
      .click(
        '//*[@id="app"]/div[2]/main/div/div/div/div/div/div/div[1]/div[1]/div/div[3]/button'
      )
      .assert.containsText(
        '//*[@id="app"]/div[2]/main/div/div/div/div/div/div/div[1]/div[1]/div/div[3]/div[2]',
        'My Friends'
      )
  }
}
