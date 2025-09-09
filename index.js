import 'dotenv/config';
import express from 'express';
import { Telegraf } from 'telegraf';
import fetch from 'node-fetch';

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// /start komandasi
bot.start((ctx) => {
  const myUsername = '@nurmurodov_001';
  const taklif = '@istamov_265';
  ctx.reply(`Bot asoschisi: AZIZBEKH NURMURODOV BAXSHILLOYEVICH\n${myUsername}`);
  ctx.reply(`Taklif va shikoyatlar uchun:\n${taklif}`);
  ctx.reply("Assalomu alaikum! 🇺🇸 Ingliz ↔️ 🇺🇿 O‘zbek tarjimon bot.");
});

// Tarjima qilish
bot.on("text", async (ctx) => {
  const text = ctx.message.text;
  const targetLang = /^[a-zA-Z\s\.\,\?\!]+$/.test(text) ? "uz" : "en";

  try {
    const res = await fetch("https://libretranslate.de/translate", {
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
    ctx.reply(`📌 Tarjima (${targetLang}):\n${data.translatedText}`);
  } catch (err) {
    console.error("Xatolik:", err);
    ctx.reply("❌ Tarjima qilishda xatolik yuz berdi.");
  }
});

// Render talab qiladigan port
const PORT = process.env.PORT || 4000;

// Bot webhookini o‘rnatish
app.use(bot.webhookCallback('/webhook'));

app.listen(PORT, async () => {
  const webhookUrl = `${process.env.RENDER_EXTERNAL_URL}/webhook`;
  await bot.telegram.setWebhook(webhookUrl);
  console.log(`🚀 Bot webhook rejimida ishlayapti: ${webhookUrl}`);
});
