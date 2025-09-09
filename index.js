import 'dotenv/config';
import { Telegraf } from 'telegraf';
import express from 'express';
import fetch from 'node-fetch';

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// /start komandasi
bot.start((ctx) => {
  const myUsername = '@nurmurodov_001';
  const taklif = '@istamov_265';
  ctx.reply(`Bot asoschisi: AZIZBEKH NURMURODOV BAXSHILLOYEVICH\n${myUsername}`);
  ctx.reply(`Taklif va shikoyatlar uchun:\n${taklif}`);
  ctx.reply("Assalomu alaykum! 🇺🇸 Ingliz ↔️ 🇺🇿 O‘zbek tarjimon bot.");
});

// Tarjima qilish
bot.on("text", async (ctx) => {
  const text = ctx.message.text;
  const targetLang = /^[a-zA-Z\s\.\,\?\!]+$/.test(text) ? "uz" : "en";

  try {
    const res = await fetch("https://translate.argosopentech.com/translate", {
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

    if (data.translatedText) {
      ctx.reply(`📌 Tarjima (${targetLang}):\n${data.translatedText}`);
    } else {
      ctx.reply("❌ Tarjima olishning iloji bo‘lmadi.");
    }
  } catch (err) {
    console.error("Xatolik:", err);
    ctx.reply("❌ Tarjima qilishda xatolik yuz berdi.");
  }
});

// Webhook o‘rnatish
app.use(bot.webhookCallback(`/webhook`));

// Render portni ochish
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ishga tushdi: ${PORT}`);
});

// Webhook URL chiqarish
console.log(`Webhook URL: https://YOUR-RENDER-APP.onrender.com/webhook`);
