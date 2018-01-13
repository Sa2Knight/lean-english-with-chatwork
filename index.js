const fs                  = require('fs')
const postChatworkMessage = require('post-chatwork-message')
const scripeDictiopnary   = require('./scripe_dictionary')

const words = JSON.parse(fs.readFileSync('words.json', 'utf8'))
const word  = words[Math.floor(Math.random() * words.length)]

const makeChatworkMessage = (response) => {
  var message = '[info]'
  message += '[title]' + response.url + '[/title]'
  message += '[qt]' + response.word + '[/qt]'
  message += response.descriptions.join('\n')
  message += '[hr]'
  message += response.sentences.join('\n\n')
  message += '[/info]'
  return message
}

scripeDictiopnary(word)
  .then((response) => {
    const msg = makeChatworkMessage(response)
    postChatworkMessage(process.env.CHATWORKAPI, '59255776', msg)
  })
  .catch((err) => {
    console.log(error)
  })
