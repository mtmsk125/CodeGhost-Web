const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

app.post('/api/fix', async (req, res) => {
  try {
    const {code, error, language} = req.body;

    if (!code || !error) {
      return res.status(400).json({error: 'الكود ورسالة الخطأ مطلوبة'});
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: `إنت خبير برمجة. صلح الكود التالي بلغة ${language} اللي فيه الخطأ: ${error}

الكود الخربان: 
${code}

رجعلي JSON بس فيه 3 مفاتيح بالضبط:
{
  "fixedCode": "الكود المصح كامل مع التنسيق",
  "explanation": "شرح الخطأ بالعربي ببساطة سطرين",
  "tip": "نصيحة قصيرة عشان ما يكرر الخطأ"
}`
      }],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const result = JSON.parse(completion.choices[0].message.content);
    res.json(result);

  } catch (e) {
    console.error('Error:', e.message);
    res.status(500).json({error: e.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CodeGhost شغال على المنفذ ${PORT}`));
