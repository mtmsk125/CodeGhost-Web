const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. CORS مفتوح عشان الفرونت يشتغل من أي دومين
app.use(cors());
// 2. بقدر يستقبل كود كبير
app.use(express.json({ limit: '2mb' }));

// 3. فحص المفتاح أول ما يقلع السيرفر
if (!process.env.GEMINI_API_KEY) {
    console.error("❌ FATAL: GEMINI_API_KEY مش موجود بالـ Environment Variables");
    process.exit(1);
}

console.log("✅ Server starting...");
console.log("
