const client = require('cheerio-httpcli')
const BASE_URL = 'https://eow.alc.co.jp/search?q='

module.exports = function(word) {
  const url = BASE_URL + word
  return client.fetch(url)
    .then((result) => {
      const $ = result.$

      // 概要をスクレイピング
      const $descriptions = $('#resultsList > ul > li').eq(0).find('li')
      const descriptionsNum = $descriptions.length
      const descriptions = []
      for (var i = 0; i < descriptionsNum; i++) {
        descriptions.push($descriptions.eq(i).text())
      }

      // 例文を最大5個スクレイピング
      const $results = $('#resultsList > ul > li')
      const sentencesNum = $results.length
      const sentences = []
      for (var i = 2; i < sentencesNum && i <= 6; i++) {
        var sentence = $results.eq(i).text().replace(/^(\r?\n)|\s?$/gm, '')
        sentences.push(sentence)
      }

      // 結果を通知
      return new Promise((resolve) => resolve({word, url,descriptions,sentences}))
    })
    .catch((err) => new Promise((_, reject) => reject(err)))
}
