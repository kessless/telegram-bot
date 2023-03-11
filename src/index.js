const TelegramBot = require('node-telegram-bot-api');
const TELEGRAM_BOT_TOKEN = '5843596200:AAFfeDlX2b2Oko9iJjjQ5fF8S6yMZO_ct0s'
const URL = 'telegram-bot-telegram-bot-55d2.up.railway.app'
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);


bot.setWebHook(`${URL}/bot${TELEGRAM_BOT_TOKEN}`);

bot.onText(/导航/,msg => {
  const {id} = msg.chat
  bot.sendMessage(id,'hello world')
})

bot.on('message', msg => {
  bot.sendMessage(msg.chat.id, 'I am alive!');
});
