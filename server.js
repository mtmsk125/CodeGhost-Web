const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

console.log("=== Server starting ===");
console.log("PORT:", PORT);
console.log("GEMINI_KEY exists:", !!process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

let model;
try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Gemini initialized OK");
} catch(e) {
    console.error("Gemini Init Error:", e.message);
}

app.post('/api/fix', async (req, res) => {
    try {
        const { code, error, language } = req.body;
        const prompt = `You are an expert ${language} developer. 
        Fix this code error and explain it simply in Arabic.
        Code: ${code}
        Error: ${error}
        Return JSON only: {"fixedCode": "...", "explanation": "..."}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonStr);
        res.json(data);
    } catch (err) {
        console.error("API Error:", err.message);
        res.status(500).json({ error: 'صار خطأ بالسيرفر' });
    }
});

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
