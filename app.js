const { GoogleGenerativeAI } = require("@google/generative-ai");
const TelegramBot = require('node-telegram-bot-api');

const telegramToken = '7081166981:AAHpuz9n_Zwscs9fYucslg9tSe3_8e5tQuc';
const googleApiKey = 'AIzaSyBchAxqSyNzaClAk1daR4l3AzI2Cb-TTkg';

const bot = new TelegramBot(telegramToken, { polling: true });


const genAI = new GoogleGenerativeAI(googleApiKey);

async function getGoogleResponse(message) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig
  });

  const result = await chatSession.sendMessage(message);
  return result.response.text();
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Chào mừng bạn đến với bot của tôi, tôi được tạo ra bởi TriTechz!');
});


bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (msg.text) {
    const messageText = msg.text.toLowerCase();
    if (messageText.includes('ai tạo ra') || messageText.includes('ai là người tạo ra') || messageText.includes('người tạo ra bạn')) {
      bot.sendMessage(chatId, 'Tôi được tạo ra bởi TriTechz!');
    } else if (messageText.includes('bạn là ai') || messageText.includes('bạn tên gì') || messageText.includes('bạn là ai?')) {
      bot.sendMessage(chatId, 'Tôi là TriTechz.AI version 1!');
    } else if (msg.text && !msg.text.startsWith('/')) {
      try {
        const response = await getGoogleResponse(msg.text);
        bot.sendMessage(chatId, response);
      } catch (error) {
        bot.sendMessage(chatId, 'Xin lỗi, có lỗi xảy ra khi gọi API.');
        console.error(error);
      }
    }
  }
  else if (msg.photo) {
    bot.sendMessage(chatId, 'Bạn đã gửi một ảnh!');
  }
  else {
    bot.sendMessage(chatId, 'Phiên bản này chúng tôi chưa hỗ trợ tính năng này.');
  }
});
