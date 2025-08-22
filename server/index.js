// server/index.js
const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// ملفات static
app.use(express.static(path.join(__dirname, "../client/public")));

// استخدام الراوتات
app.use(routes);

// صفحة رئيسية
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/public/index.html"));
});

// تشغيل السيرفر
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
