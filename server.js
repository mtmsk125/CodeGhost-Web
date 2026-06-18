const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => res.send(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>CodeGhost Free</title><style>body{background:#0f172a;color:#e2e8f0;font-family:Cairo;padding:20px;margin:0}.container{max-width:800px;margin:auto}h1{color:#38bdf8;text-align:center}textarea,select{width:100%;background:#1e293b;color:#e2e8f0;border:1px solid #334155;border-radius:8px;padding:12px;margin:10px 0;font-size:15px;box-sizing:border-box;font-family:Cairo}button{background:#38bdf8;color:#0f172a;border:none;padding:15px;border-radius:8px;width:100%;font-weight:bold;cursor:pointer;font-size:16px;font-family:Cairo}#result{display:none;margin-top:20px}pre{background:#000;color:#4ade80;padding:15px;border-radius:8px;overflow:auto;direction:ltr;text-align:left}.explain{background:#1e293b;padding:12px;border-radius:8px;margin-top:8px}.badge{background:#f59e0b;color:#000;padding:4px 8px;border-radius:4px;font-size:12px;margin-bottom:10px;display:inline-block}.counter{color:#fbbf24;text-align:center;margin:10px 0}.ad{margin:20px 0;text-align:center}.pro-btn{background:#f59e0b;margin-top:10px}</style></head><body><div class="container"><h1>CodeGhost Free 👻</h1><div class="badge">5 تصليحات مجانية باليوم</div><div class="counter" id="counter">متبقي لك: 5 تصليحات اليوم</div>

<div class="ad">
<!-- كود PropellerAds - حطه هون لما تسجل -->
<script async data-cfasync="false" src="//your-propeller-script.js"></script>
<div style="height:90px;background:#1e293b;border:1px dashed #475569;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#64748b">إعلان PropellerAds</div>
</div>

<select id="lang"><option>JavaScript</option><option>Python</option><option>HTML
