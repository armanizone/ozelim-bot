import telegramApi from "node-telegram-bot-api";
import express from 'express'

const token = process.env.TOKEN;

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const bot = new telegramApi(token, { polling: true });

// bot.setWebHook(`ozelim-bot.vercel.app`)

bot.setMyCommands([
  { command: "/start", description: "Начальное приветствие" },
  { command: "/1", description: "команда 1" },
  { command: "/2", description: "команда 2" },
  { command: "/3", description: "команда 3" },
  { command: "/4", description: "команда 4" },
]);

const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2", callback_data: "2" },
      ],
      [
        { text: "3", callback_data: "3" },
        { text: "4", callback_data: "4" },
      ],
    ],
  }),
};

bot.on("message", (res) => {
  const chatId = res.chat.id;
  const { text } = res;

  if (text === "/start") {
    return bot.sendMessage(chatId, `Ozelim bot`, options);
  }
  if (text === "/1") {
    return bot.sendMessage(chatId, `команда1`);
  }
  if (text === "/2") {
    return bot.sendMessage(chatId, `команда2`);
  }
  if (text === "/3") {
    return bot.sendMessage(chatId, `команда3`);
  }
  if (text === "/4") {
    return bot.sendMessage(chatId, `команда4`);
  }

  return bot.sendMessage(chatId, `Я вас не понимаю`);
});

bot.on(`callback_query`, (res) => {
  console.log(res);
  const chatId = res.from.id;
  const { data } = res;

  if (data === "1") {
    return bot.sendMessage(chatId, `команда1`);
  }
  if (data === "2") {
    return bot.sendMessage(chatId, `команда2`);
  }
  if (data === "3") {
    return bot.sendMessage(chatId, `команда3`);
  }
  if (data === "4") {
    return bot.sendMessage(chatId, `команда4`);
  }
});