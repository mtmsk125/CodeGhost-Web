const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API endpoint to fix code
app.post('/api/fix', async (req, res) => {
    try {
        const { code, error, language } = req.body;
        
        if (!code || !error) {
            return res.status(400).json({ error: 'Code and Error are required' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        
        const prompt = `You are a senior ${language} developer. Fix the code and explain the bug clearly.
Return ONLY valid JSON with this exact format:
{
  "fixedCode": "the corrected code here",
  "explanation": "simple explanation why the bug happened and how the fix works"
}

Code:
${code}

Error:
${error
