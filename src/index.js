const { oprateDBWraper } = require('./mongDB/index')
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


bot.onText(/^导航$/, async msg => {
  const { id } = msg.chat
  const buttons = await oprateDBWraper('test')
  bot.sendMessage(id, `${buttons}`, {
    reply_markup: {
      inline_keyboard: buttons
    }
  })
})

// bot.onText(/^设置导航$/, (msg, chat) => {
//   const { from: { id: userId } } = msg
//   console.log('xh---msg', msg)
//   const { type, id } = chat
//   if (type === 'private') {
//     bot.sendMessage(id, '设置导航', {
//       reply_markup: {
//         inline_keyboard: [{ text: '选择一个你所管理的群组', switch_inline_query: '设置导航' }]
//       }
//     })
//   }
// });

// bot.on('message',msg=>{
//   const { id } = msg.chat
//   console.log('xh------msg',msg)
//   bot.sendMessage(id, '菜单')
// })


bot.on('webhook_error', (error) => {
  console.log(error.code);  // => 'EPARSE'
});
