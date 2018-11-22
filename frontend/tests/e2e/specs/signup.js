const BASE_URL = process.env.VUE_DEV_SERVER_URL

module.export = {
  'Sign up': browser => {
    browser
      .url(`${BASE_URL}/signup`)
      .waitForElementVisible('#app', 5000)
      .screenshot()
      .clearValue('input[aria-label="E-mail"]')
      .setValue('input[aria-label="E-mail"]', 'test@example.com')
      .clearValue('input[aria-label="Password"]')
      .setValue('input[aria-label="Password"]', 'Aa=123')
      .clearValue('input[aria-label="Confirm Password"]')
      .setValue('input[aria-label="Confirm Password"]', 'Aa=123')
      .click('button[type="submit"]')
      .pause(500)
      .assert.urlEquals(`${BASE_URL}/profile`)
      .end()
  }
}
