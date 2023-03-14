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


bot.onText(/^导航$/, msg => {
  const { id } = msg.chat
  bot.sendMessage(id, 'hello', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '已验资源', url: 't.me/kessless_bot/121' },
          { text: '车评上传', url: 't.me/shiyan456/4' },
        ],
        [
          { text: '高端外围', url: 't.me/kessless_bot/121' },
          { text: '电影频道', url: 't.me/shiyan456/4' },
        ],
        [
          { text: '精准楼凤', url: 't.me/kessless_bot/121' },
          { text: '误封申诉群', url: 't.me/shiyan456/4' },
        ],
        [
          { text: 'TG安装教程', url: 't.me/kessless_bot/121' },
          { text: '全国导航', url: 't.me/shiyan456/4' },
        ],
        [
          { text: '设置中文', url: 't.me/setlanguage/classic-zh-cn' }
        ]
      ],
    }
  })
})

bot.on('message', msg => {
  const { chat: { id: chat_id }, reply_to_message, text } = msg
  switch (text) {
    case '/查看id':
      if (!reply_to_message) return
      bot.sendMessage(chat_id, `${reply_to_message.message_id}`)
      break;
    case 'db':
      oprateDBWraper('test').then(res=>{
        bot.sendMessage(chat_id, `执行力db------${res}`)
      })
      break;

    default:
      break;
  }
  console.log('xh----msg', msg)
});

bot.setMyCommands()

bot.on('webhook_error', (error) => {
  console.log(error.code);  // => 'EPARSE'
});
