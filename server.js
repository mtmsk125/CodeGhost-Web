const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.get('/', (req,res) => {
res.send(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="monetag" content="94f811dbbfcad4f9f306e4656c18c2d6"> <!-- هاد للتحقق -->
<title>CodeGhost - AI Code Fixer</title>
<style>
body{font-family:'Cairo',sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);margin:0;padding:20px;min-height:100vh;color:#333}
.container{max-width:800px;margin:0 auto;background:white;border-radius:20px;padding:40px;box-shadow:0 20px 60px rgba(0,0,0,0.3)}
h1{color:#667eea;text-align:center;font-size:2.5em;margin-bottom:10px}
.subtitle{text-align:center;color:#666;margin-bottom:30px}
textarea{width:100%;height:200px;padding:15px;border:2px solid #ddd;border-radius:10px;font-family:'Courier New',monospace;font-size:14px;resize:vertical;box-sizing:border-box}
textarea:focus{outline:none;border-color:#667eea}
button{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;border:none;padding:15px 40px;font-size:16px;border-radius:10px;cursor:pointer;margin-top:15px;width:100%;font-weight:bold;transition:0.3s}
button:hover{transform:translateY(-2px);box-shadow:0 10px 20px rgba(102,126,234,0.4)}
button:disabled{opacity:0.6;cursor:not-allowed}
#result{margin-top:30px;padding:20px;background:#f8f9fa;border-radius:10px;display:none;border-right:4px solid #667eea}
#result.show{display:block}
.code-box{background:#1e1e1e;color:#d4d4d4;padding:15px;border-radius:8px;overflow-x:auto;margin:10px 0;font-family:'Courier New',monospace;font-size:13px}
.tip{background:#fff3cd;border-right:4px solid #ffc107;padding:10px;border-radius:5px;margin-top:10px}
.upgrade{margin-top:20px;padding:15px;background:linear-gradient(135deg,#ffd89b 0%,#19547b 100%);color:white;border-radius:10px;text-align:center}
.upgrade a{color:white;font-weight:bold;text-decoration:underline}
.adsense{margin:30px 0;text-align:center;min-height:90px;background:#f0f0f0;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#999}
</style>
</head>
<body>
<div class="container">
<h1>👻 CodeGhost Free</h1>
<p class="subtitle">مصحح الأكواد بالذكاء الاصطناعي - النسخة المجانية</p>

<div class="adsense">
<!-- ADSENSE_AD_CODE -->
</div>

<label>الصق الكود اللي فيه خطأ:</label>
<textarea id="codeInput" placeholder="function test() { console.log('hello' }
