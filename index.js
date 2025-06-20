const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

// 🔑 Suas credenciais da Z-API:
const API_KEY = "6575ABAC671F1DDF42D83BE3"; // SUA API KEY
const INSTANCE_ID = "3E30073C3A03C0F3E3CF2208CC1500D8"; // SEU INSTANCE ID

const ZAPI_URL = `https://api.z-api.io/instances/${INSTANCE_ID}/token/${API_KEY}`;

app.post("/webhook", async (req, res) => {
  const msg = req.body.message.body?.toLowerCase() || "";
  const number = req.body.message.from;

  if (msg.includes("quero aprender")) {
    await sendMessage(
      number,
      `📘 *Lição 1 - Espanhol para Iniciantes*  
Frase: *Hola, ¿cómo estás?*  
Tradução: Olá, como você está?`,
    );

    await sendMessage(number, "🗣 Enviando áudio com a pronúncia...");
    await sendAudio(
      number,
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    ); // Áudio temporário

    await sendMessage(number, "❓ *Pergunta:* Como se diz 'Olá' em espanhol?");
  }

  res.sendStatus(200);
});

async function sendMessage(phone, text) {
  await axios.post(`${ZAPI_URL}/send-message`, {
    phone,
    message: text,
  });
}

async function sendAudio(phone, audioUrl) {
  await axios.post(`${ZAPI_URL}/send-audio`, {
    phone,
    audio: audioUrl,
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Bot rodando na porta " + PORT);
});

