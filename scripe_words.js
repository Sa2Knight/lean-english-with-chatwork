const client = require('cheerio-httpcli')
const BASE_URL = 'http://oboeki.com/english/vocabulary/category/toeic/'

client.fetch(BASE_URL)
      .then((result) => {
        const cells = result.$('.excerpt-inventory a')
        const words = []
        cells.each((idx, cell) => words.push(result.$(cell).text()))
        console.log(JSON.stringify(words))
      })
