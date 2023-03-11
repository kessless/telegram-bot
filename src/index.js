const TeleBot = require('telebot');
const TELEGRAM_BOT_TOKEN = '5843596200:AAFfeDlX2b2Oko9iJjjQ5fF8S6yMZO_ct0s'
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
bot.on('text', (msg) => msg.reply.text(msg.text));

bot.start();