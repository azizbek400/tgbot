import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { translate } from '@vitalets/google-translate-api';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  const myUsername = '@nurmurodov_001';
  const taklif = '@istamov_265';
  ctx.reply(`Bot asoschisi: AZIZBEKH NURMURODOV BAXSHILLOYEVICH\n${myUsername}`);
  ctx.reply(`Taklif va shikoyatlar uchun:\n${taklif}`);
  ctx.reply("Assalomu alaikum! 🇺🇸 Ingliz ↔️ 🇸🇱 O‘zbek tarjimon bot.");
});

bot.on("text", async (ctx) => {
  const text = ctx.message.text;
  let targetLang = "en";

  try {
    if (/^[a-zA-Z\s\.\,\?\!]+$/.test(text)) {
      targetLang = "uz";
    } else {
      targetLang = "en";
    }

    const res = await translate(text, { to: targetLang });
    ctx.reply(`📌 Tarjima:\n${res.text}`);
  } catch (err) {
    console.error("Xatolik:", err);
    ctx.reply("❌ Tarjima qilishda xatolik yuz berdi.");
  }
});

bot.launch();
console.log("🤖 Tarjima bot ishga tushdi...");


