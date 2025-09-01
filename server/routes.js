const express = require('express');
const router = express.Router();
const products = require('./products'); // بيانات المنتجات

// جلب كل المنتجات
router.get('/product', (req, res) => {
    res.json(products);
});

// جلب منتج واحد بالـ ID
router.get('/product/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// إضافة منتج جديد
router.post('/add', (req, res) => {
    const { name, price } = req.body;

    if(!name || isNaN(parseFloat(price))) {
        return res.status(400).json({ message: "Invalid input" });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price: parseFloat(price),
        image: '/image/default.png'
    };

    products.push(newProduct);
    res.json({ message: "Product added", product: newProduct });
});

// بيانات Dashboard
router.get('/dashboard', (req, res) => {
    const totalProducts = products.length;

    if(totalProducts === 0) {
        return res.json({
            totalProducts: 0,
            mostExpensive: 0,
            cheapestItem: 0,
            averagePrice: 0
        });
    }

    const prices = products.map(p => Number(p.price) || 0);
    const mostExpensive = Math.max(...prices);
    const cheapestItem = Math.min(...prices);
    const averagePrice = Math.round(prices.reduce((sum, p) => sum + p, 0) / totalProducts * 100) / 100;

    res.json({
        totalProducts,
        mostExpensive,
        cheapestItem,
        averagePrice,
    });
});
router.get('/search', (req, res) => {
    const keyword = (req.query.keyword || "").trim().toLowerCase();
    console.log("Search keyword:", keyword); // اضيف سطر تتبع
    if (!keyword) return res.json([]); 
    const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
    res.json(filtered);
});



module.exports = router;
