const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const port = process.env.PORT;
const TELEGRAM_BOT_TOKEN = '5843596200:AAFfeDlX2b2Oko9iJjjQ5fF8S6yMZO_ct0s'
const URL = 'telegram-bot-telegram-bot-55d2.up.railway.app'
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);


bot.setWebHook(`${URL}/bot${TELEGRAM_BOT_TOKEN}`);

const app = express();

app.use(express.json());

// We are receiving updates at the route below!
app.post(`/bot${TELEGRAM_BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

bot.onText(/\/start$/, msg => {
  const { id } = msg.chat
  bot.sendMessage(id,'hello', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'button1', callback_data: 'button1' },
          { text: 'button2', callback_data: 'button2' },
          { text: 'button3', callback_data: 'button3' },
          { text: 'button4', callback_data: 'button4' },
        ],
        [
          { text: '机器人口令一览', callback_data: 'button5' },
        ]
      ]
    }
  })
})

bot.on('message', msg => {
  console.log()
  bot.sendMessage(msg.chat.id, 'I am alive!');
});

bot.on('webhook_error', (error) => {
  console.log(error.code);  // => 'EPARSE'
});

bot.on('callback_query', query => {
  const { queryId, data, message: { chat: { id } } } = query
  bot.answerCallbackQuery(queryId)
})