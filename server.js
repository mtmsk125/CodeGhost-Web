const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// فحص المفتاح قبل كل شي
if (!process.env.GEMINI_API_KEY) {
    console.error("❌ FATAL ERROR: GEMINI_API_KEY مش موجود");
    process.exit(1);
}

console.log("🚀 Starting CodeGhost...");
console.log("PORT:", PORT);
console.log("GEMINI_KEY exists: true");

let model;
try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { temperature: 0.3, maxOutputTokens: 2000 }
    });
    console.log("✅ Gemini initialized");
} catch(e) {
    console.error("❌ Gemini Init Error:", e.message);
    process.exit(1);
}

app.post('/api/fix', async (req, res) => {
    try {
        const { code, error, language } = req.body;
        if (!code || !error || !language) {
            return res.status(400).json({ error: 'الكود والخطأ واللغة مطلوبين' });
        }

        const prompt = `انت خبير ${language}. صلح الكود واشرح الخطأ بالعربي البسيط واعطي نصيحة.
الكود: \`\`${language}\n${code}\n\`\`
الخطأ: ${error}
ارجع JSON فقط: {"fixedCode":"...","explanation":"...","tip":"..."}`;

        const result = await model.generateContent(prompt);
        let text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        res.json(JSON.parse(text));

    } catch (err) {
        console.error("API Error:", err.message);
        res.status(500).json({ error: 'خطأ بالسيرفر', details: err.message });
    }
});

app.get('/ping', (req, res) => res.status(200).send('pong'));
app.get('/', (req, res) => res.send('<h1 style="text-align:center;font-family:Cairo">CodeGhost API شغال 👻</h1>'));

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on ${PORT}`));
