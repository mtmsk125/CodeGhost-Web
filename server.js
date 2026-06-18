const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/fix', async (req, res) => {
  try {
    const {code, error, language} = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: `إنت خبير برمجة. صلح الكود التالي بلغة ${language} اللي فيه الخطأ: ${error}

كود: ${code}

رجعلي JSON بس فيه 3 مفاتيح:
{
  "fixedCode": "الكود المصح كامل",
  "explanation": "شرح الخطأ بالعربي ببساطة",
  "tip": "نصيحة قصيرة عشان ما يكرر الخطأ"
}`
      }],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    res.json(result);

  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

app.listen(3000, () => console.log('CodeGhost شغال على 3000'));
