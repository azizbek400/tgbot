import 'dotenv/config';
import { Telegraf } from 'telegraf';
import express from 'express';
import fetch from 'node-fetch';

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Admin ID ni yozing (o'zingizning Telegram ID'ingiz)
const ADMIN_ID = 7911735881;

bot.start(async (ctx) => {
  const user = ctx.from;
  const myUsername = '@nurmurodov_001';
  const taklif = '@istamov_265';

  // Foydalanuvchiga salom
  await ctx.reply(`Assalomu alaykum, ${user.first_name || "do‘st"}! 🇺🇸 Ingliz ↔️ 🇺🇿 O‘zbek tarjimon bot.`);
  await ctx.reply(`Bot asoschisi: AZIZBEKH NURMURODOV BAXSHILLOYEVICH\n${myUsername}`);
  await ctx.reply(`Taklif va shikoyatlar uchun:\n${taklif}`);

  // Adminga xabar
  await bot.telegram.sendMessage(
    ADMIN_ID,
    `📢 Yangi foydalanuvchi start bosdi:\n\n` +
    `👤 Ism: ${user.first_name || ""} ${user.last_name || ""}\n` +
    `🔗 Username: @${user.username || "yo‘q"}\n` +
    `🆔 ID: ${user.id}`
  );
});

bot.on("text", async (ctx) => {
  const text = ctx.message.text;
  const targetLang = /^[a-zA-Z\s\.\,\?\!]+$/.test(text) ? "uz" : "en";

  try {
    const res = await fetch("https://translate.astian.org/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: targetLang,
        format: "text"
      }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    ctx.reply(`📌 Tarjima (${targetLang}):\n${data.translatedText}`);
  } catch (err) {
    console.error("Xatolik:", err);
    ctx.reply("❌ Tarjima qilishda xatolik yuz berdi.");
  }
});

// Webhook
app.use(bot.webhookCallback(`/webhook`));

// Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ishga tushdi: ${PORT}`);
});

// Haqiqiy Render URL bilan almashtiring
console.log(`Webhook URL: https://tgbot-5-zvse.onrender.com/webhook`);
