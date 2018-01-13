const fs                  = require('fs')
const postChatworkMessage = require('post-chatwork-message')
const scripeDictiopnary   = require('./scripe_dictionary')

const words = JSON.parse(fs.readFileSync('words.json', 'utf8'))
const word  = words[Math.floor(Math.random() * words.length)]

const makeChatworkMessage = (response) => {
  var message = response.sentences.join("\n\n")
  message += "\n\n" + response.url
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
