const { oprateDBWraper } = require('./mongDB/index')
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const port = process.env.PORT;
const TELEGRAM_BOT_TOKEN = '5843596200:AAFfeDlX2b2Oko9iJjjQ5fF8S6yMZO_ct0s'
const URL = 'telegram-bot-telegram-bot-55d2.up.railway.app'
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);

const botName = 'kessless_bot'


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


// bot.onText(/^导航$/, async (msg,chat) => {
//   const { id } = msg.chat
//   const buttons = await oprateDBWraper('test')
//   // bot.sendMessage(id, `${buttons}`, {
//   //   reply_markup: {
//   //     inline_keyboard: buttons
//   //   }
//   // })
//   console.log('xh---------buttons',buttons[0])
//   bot.sendMessage(id, `${buttons}`)
// })

bot.onText(/^导航$/, ({ from, chat }) => {
  const { id: userId } = from
  const { type, id } = chat
  if (type === 'private') {
    bot.sendMessage(id, '导航', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '榜单报告', url: `//t.me/YLQXBDBG` },
            { text: '车评上传', url: `//t.me/YLQXZZ8/16` }
          ],
          [
            { text: '私人定制', url: `//t.me/YLQXBDBG` },
            { text: '电影频道', url: `//t.me/YLQXDY` }
          ],
          [
            { text: '精准楼凤', url: `//t.me/YLQXBDBG` },
            { text: '误封申诉群', url: `//t.me/YLQXSS` }
          ],
          [
            { text: 'TG安装教程', url: `https://t.me/YLQXZZ8/2` },
            { text: '全国导航', url: `//t.me/YLQXZZ8/8` }

          ],
          [
            { text: '报告总览', url: `//t.me/+D7lPP-ce4khlMzRl` },
            { text: '黑车榜', url: `//t.me/+BiKSExwG5-03Yjg1` }
          ],
          [
            { text: '汉化中文包', url: `tg://setlanguage?lang=zhcncc` }
          ]

        ]
      }
    })
  }
});
bot.onText(/^\/start.*$/, ({ message_id, from, chat }) => {
  const { id } = chat
  bot.deleteMessage(id, message_id)
});

// bot.on('new_chat_members', ({ from, chat }) => {
//   const { id } = chat
//   bot.sendMessage(id, '欢迎新人进入！')
// })



bot.setMyCommands([{ command: '/start', description: '设置机器人' }])




bot.on('webhook_error', (error) => {
  console.log(error.code);  // => 'EPARSE'
});
