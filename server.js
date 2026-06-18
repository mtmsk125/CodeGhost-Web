const express = require('express');
const cors = require('cors');
const OpenAI = require('openai').default; // هاي التعديلة اللي كانت توقع السيرفر
const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

// الصفحة
app.get('/', (req,res) => res.send(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>CodeGhost</title><style>body{background:#0f172a;color:#e2e8f0;font-family:Cairo;padding:20px;margin:0}.container{max-width:800px;margin:auto}h1{color:#38bdf8;text-align:center;margin-bottom:30px}textarea,select{width:100%;background:#1e293b;color:#e2e8f0;border:1px solid #334155;border-radius:8px;padding:12px;margin:10px 0;font-size:15px;box-sizing:border-box;font-family:Cairo}button{background:#38bdf8;color:#0f172a;border:none;padding:15px;border-radius:8px;width:100%;font-weight:bold;cursor:pointer;font-size:16px;font-family:Cairo}#result{display:none;margin-top:20px}pre{background:#000;color:#4ade80;padding:15px;border-radius:8px;overflow:auto;direction:ltr;text-align:left}.explain{background:#1e293b;padding:12px;border-radius:8px;margin-top:8px}</style></head><body><div class="container"><h1>CodeGhost 👻</h1><select id="lang"><option>JavaScript</option><option>Python</option><option>HTML/CSS</option><option>PHP</option></select><textarea id="code" placeholder="الصق الكود الخربان هون..." rows="8"></textarea><textarea id="error" placeholder="الصق رسالة الخطأ هون..." rows="3"></textarea><button id="btn" onclick="fix()">🔧 صلح الكود</button><div id="result"><h3 style="color:#4ade80">الكود المصح:</h3><pre id="fixed"></pre><h3 style="color:#38bdf8">الشرح:</h3><div class="explain" id="explain"></div><div class="explain" id="tip" style="color:#fbbf24;margin-top:10px"></div></div></div><script>async function fix(){const b=document.getElementById('btn');b.disabled=true;b.innerText='⏳ جاري...';try{const r=await fetch('/api/fix',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:document.getElementById('code').value,error:document.getElementById('error').value,language:document.getElementById('lang').value})});const d=await r.json();document.getElementById('fixed').innerText=d.fixedCode||'خطأ';document.getElementById('explain').innerText=d.explanation||'';document.getElementById('tip').innerText=d.tip?'💡 '+d.tip:'';document.getElementById('result').style.display='block'}catch(e){alert('خطأ: '+e.message)}b.disabled=false;b.innerText='🔧 صلح الكود'}</script></body></html>`));

// API - النسخة اللي بتعالج كل مشاكل JSON
app.post('/api/fix', async (req,res)=>{
  try{
    const {code,error,language}=req.body;
    if(!code ||!error) return res.json({fixedCode:"دخل الكود والخطأ", explanation:"", tip:""});

    const completion = await openai.chat.completions.create({
      model:"gpt-4o-mini",
      messages:[{role:"user",content:`إنت مصلح أكواد. صلح كود ${language} فيه خطأ: ${error}. الكود: ${code}. رجع JSON خام بدون أي كلام زيادة ولا \`\`json: {"fixedCode":"الكود المصح كامل","explanation":"شرح الخطأ بالعربي سطرين","tip":"نصيحة قصيرة"}`}]
    });

    let text = completion.choices[0].message.content.trim();
    text = text.replace(/```json/g,'').replace(/```/g,'').trim();
    const result = JSON.parse(text);
    res.json(result);

  }catch(e){
    console.error('Error:', e.message);
    res.json({
      fixedCode:"// صار خطأ بالسيرفر: "+e.message,
      explanation:"تأكد من مفتاح OpenAI صحيح ومفعل الفواتير",
      tip:"جرب مفتاح جديد من platform.openai.com"
    });
  }
});

app.listen(process.env.PORT||3000,()=>console.log('CodeGhost شغال على البورت',process.env.PORT||3000));
