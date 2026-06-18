const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

// الصفحة لحالها جوا الكود
app.get('/', (req,res) => res.send(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>CodeGhost</title><style>body{background:#0f172a;color:#e2e8f0;font-family:Cairo;padding:20px}.container{max-width:800px;margin:auto}h1{color:#38bdf8;text-align:center}textarea,select{width:100%;background:#1e293b;color:#e2e8f0;border:1px solid #334155;border-radius:8px;padding:12px;margin:10px 0;font-size:15px}button{background:#38bdf8;color:#0f172a;border:none;padding:15px;border-radius:8px;width:100%;font-weight:bold;cursor:pointer}#result{display:none;margin-top:20px}pre{background:#000;color:#4ade80;padding:15px;border-radius:8px;overflow:auto}</style></head><body><div class="container"><h1>CodeGhost 👻</h1><select id="lang"><option>JavaScript</option><option>Python</option><option>HTML/CSS</option><option>PHP</option></select><textarea id="code" placeholder="الصق الكود الخربان هون..." rows="8"></textarea><textarea id="error" placeholder="الصق رسالة الخطأ هون..." rows="3"></textarea><button onclick="fix()">🔧 صلح الكود</button><div id="result"><h3 style="color:#4ade80">الكود المصح:</h3><pre id="fixed"></pre><h3 style="color:#38bdf8">الشرح:</h3><div id="explain" style="background:#1e293b;padding:12px;border-radius:8px"></div></div></div><script>const API='/api/fix';async function fix(){const btn=event.target;btn.disabled=true;btn.innerText='⏳ جاري...';const r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:code.value,error:error.value,language:lang.value})});const d=await r.json();fixed.innerText=d.fixedCode;explain.innerText=d.explanation;result.style.display='block';btn.disabled=false;btn.innerText='🔧 صلح الكود'}</script></body></html>`));

app.post('/api/fix', async (req,res)=>{
  try{
    const {code,error,language}=req.body;
    const c=await openai.chat.completions.create({
      model:"gpt-4o-mini",
      messages:[{role:"user",content:`صلح كود ${language} خطأ: ${error}. الكود: ${code}. رجع JSON: {fixedCode,explanation,tip} عربي`}],
      response_format:{type:"json_object"}
    });
    res.json(JSON.parse(c.choices[0].message.content));
  }catch(e){res.status(500).json({error:e.message})}
});

app.listen(process.env.PORT||3000,()=>console.log('شغال'));
