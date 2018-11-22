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
  'Edit Profile': browser => {
    browser
      .click('a[href="/profile"]')
      .waitForElementVisible('#app')
      .assert.urlEquals(`${BASE_URL}/profile`)
      .screenshot()
      .click('button[type="submit"]')
  }
}
