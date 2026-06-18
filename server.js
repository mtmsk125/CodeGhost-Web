import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(express.json({limit: '2mb'}));
app.use(express.static('.'));

const GEMINI_KEY = process.env.GEMINI_API_KEY;
if(!GEMINI_KEY) {
    console.log('ERROR: حط GEMINI_API_KEY بالـ Environment Variables تبع Render');
}

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

app.post('/fix', async (req, res) => {
    try {
        const {code, error} = req.body;
        
        if(!code || !error) {
            return res.json({fixedCode: 'الكود أو الـ Error فاضي يا معلم'});
        }
        
        // سر الخلطة - البرومبت القاتل
        const prompt = `انت مهندس برمجيات سينيور خبرة 20 سنة. مهمتك وحدة: تصليح Bugs.
        
        عندك كود فيه مشكلة + رسالة خطأ من الـ Terminal.
        رجعلي الكود كامل مصح 100%. بدون شرح. بدون مقدمات. بدون "هون الكود". بس الكود.
        
        لو ما قدرت تصلحه، رجع الكود الأصلي.
        
        رسالة الخطأ:
        ${error}
        
        الكود:
        \`\`
        ${code}
        \`\`
        
        الكود المصح كامل الآن:`;
        
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        let fixedCode = result.response.text();
        
        // بنشيل ``` من أول وآخر الكود إذا الـ AI حطها
        fixedCode = fixedCode.replace(/```[a-z]*\n/g, '').replace(/```$/g, '').trim();
        
        res.json({fixedCode});
    } catch(e) {
        console.log('Error:', e.message);
        res.json({fixedCode: 'صار خطأ بالـ AI يا وحش. جرب مرة ثانية 👻'});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CodeGhost شغال على بورت ${PORT} 👻`));
