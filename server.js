import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// دكتور الكود 👨‍⚕️
app.post('/api/fix', async (req, res) => {
  const { code } = req.body;

  if (!code || !code.trim()) {
    return res.json({ error: 'وين الكود يا شبح؟ الصندوق فاضي 👻' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.json({ error: 'نسيت تحط OPENAI_API_KEY بـ Render' });
  }

  try {
    const prompt = `انت CodeGhost، أشطر مبرمج بالعالم. مهمتك تصليح الكود وشرحه بالعربي العامي.

الكود الخربان:
${code}

رجع الجواب بهالصي
