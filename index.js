import 'dotenv/config';
import { Telegraf } from 'telegraf';
import fetch from 'node-fetch';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  const myUsername = '@nurmurodov_001';
  const taklif = '@istamov_265';
  ctx.reply(`Bot asoschisi: AZIZBEKH NURMURODOV BAXSHILLOYEVICH\n${myUsername}`);
  ctx.reply(`Taklif va shikoyatlar uchun:\n${taklif}`);
  ctx.reply("Assalomu alaikum! 🇺🇸 Ingliz ↔️ 🇺🇿 O‘zbek tarjimon bot.");
});

bot.on("text", async (ctx) => {
  const text = ctx.message.text;

  try {
    // Inglizcha bo‘lsa → uz, aks holda → en
    const targetLang = /^[a-zA-Z\s\.\,\?\!]+$/.test(text) ? "uz" : "en";

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

bot.launch();
console.log("🤖 LibreTranslate yordamida Ingliz ↔ O‘zbek bot ishga tushdi...");
