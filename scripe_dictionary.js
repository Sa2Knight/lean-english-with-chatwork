const client = require('cheerio-httpcli')
const BASE_URL = 'https://eow.alc.co.jp/search?q='

module.exports = function(word) {
  const url = BASE_URL + word
  return client.fetch(url)
    .then((result) => {
      const $ = result.$
      const $results = $('#resultsList > ul > li')
      const num = $results.length
      const sentences = []
      for (var i = 2; i < num && i <= 6; i++) {
        var sentence = $results.eq(i).text().replace(/^(\r?\n)|\s?$/gm, '')
        sentences.push(sentence)
      }
      return new Promise((resolve) => resolve({url,sentences}))
    })
    .catch((err) => new Promise((_, reject) => reject(err)))
}
