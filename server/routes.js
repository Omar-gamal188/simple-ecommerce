const express = require('express');
const router = express.Router();
const path = require('path');
const products = require('./products'); // بيانات المنتجات

// صفحة البحث
router.get('/find', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/pages/find.html"));
});

// البحث عن منتج
router.get('/search', (req, res) => {
    const keyword = (req.query.keyword || "").trim().toLowerCase();
    if (!keyword) return res.json([]); 
    const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
    res.json(filtered);
});

router.get('/dashboard', (req, res) => {
   const totalProducts = products.length;
   const mostExpensive = Math.max(...products.map(p => p.price));
   const cheapestItem = Math.min(...products.map(p => p.price));
   const averagePrice = Math.round(products.reduce((sum, p) => sum + p.price, 0) / totalProducts * 100) / 100;

   res.json({
        totalProducts,
        mostExpensive,
        cheapestItem,
        averagePrice,
   })
});


// API لكل المنتجات
router.get('/api/product', (req, res) => {
    res.json(products);
});

module.exports = router;
