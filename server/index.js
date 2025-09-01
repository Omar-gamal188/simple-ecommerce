const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.use('/api', routes);
app.get('/find', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/pages/find.html"));
});

// ملفات ثابتة
app.use(express.static(path.join(__dirname, "../client/public")));

// أي رابط غير موجود يرجع index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/public/index.html"));
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
