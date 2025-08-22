// server/routes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const products = require('./products');

// صفحة البحث
router.get('/find', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/pages/find.html"));
});

// البحث عن منتج
router.get('/search', (req, res) => {
    const keyword = (req.query.keyword || "").trim().toLowerCase();
    if (!keyword) return res.json([]); // لو فاضية، رجع مصفوفة فاضية

    const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
    res.json(filtered);
});

// API لكل المنتجات
router.get('/api/product', (req, res) => {
    res.json(products);
});

module.exports = router;
