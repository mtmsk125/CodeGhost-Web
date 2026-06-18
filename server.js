const express = require('express');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/fix', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'ابعتلي كود اصلحه يا شبح' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "انت CodeGhost. صلح الكود البرمجي واكتب شرح قصير للخطأ بالعربي" },
        { role: "user", content: `صلحلي هالكود واشرحلي وين كان الغلط:\n\n${code}` }
      ],
      max_tokens: 600,
      temperature: 0.7
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'السيرفر تعبان شوي: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`CodeGhost شغال على ${port} 👻`);
});
