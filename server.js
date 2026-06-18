const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. تهيئة Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 2. API الرئيسي - تصليح الكود
app.post('/api/fix', async (req, res) => {
    try {
        const { code, error, language } = req.body;
        
        const prompt = `You are an expert ${language} developer. 
        Fix this code error and explain it simply in Arabic.
        
        Code:
        ${code}
        
        Error:
        ${error}
        
        Return JSON format only:
        {
            "fixedCode": "الكود المصح كامل",
            "explanation": "شرح بسيط بالعربي لسبب الخطأ وكيف تم التصليح"
        }`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // تنظيف الرد عشان يصير JSON صافي
        const jsonStr = text.replace(/```json/g, '').replace
