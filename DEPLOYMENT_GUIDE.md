# Vercel Deployment Guide for Simple Ecommerce App

## ✅ Fixed Issues

1. **Fixed Configuration File Name**: Changed `vercal.json` to `vercel.json`
2. **Fixed Express Version**: Downgraded from Express 5.1.0 (beta) to stable Express 4.18.2
3. **Fixed Server Configuration**: Updated server to handle both local development and Vercel deployment
4. **Fixed Routing**: Simplified Vercel configuration to route all requests through the Express server

## 📁 Project Structure

```
├── client/
│   ├── pages/
│   │   └── find.html
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── image/
│   │   │   └── *.avif (product images)
│   │   ├── index.html
│   │   └── js/
│   └── src/
├── server/
│   ├── index.js
│   ├── products.js
│   └── routes.js
├── package.json
├── vercel.json
└── DEPLOYMENT_GUIDE.md
```

## 🚀 Deployment Steps

### 1. Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Vercel
```bash
vercel --prod
```

### 4. Or deploy using GitHub integration
- Push your code to GitHub
- Connect your GitHub repository to Vercel
- Vercel will automatically deploy on every push

## 🔧 Configuration Files

### vercel.json
```json
{
  "version": 2,
  "builds": [
    { "src": "server/index.js", "use": "@vercel/node" }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server/index.js"
    }
  ]
}
```

### package.json (updated)
- Express version: 4.18.2 (stable)
- Added @vercel/node as dev dependency

## 🌐 API Endpoints

- `GET /` - Main page
- `GET /find` - Search page
- `GET /api/product` - Get all products
- `GET /search?keyword=...` - Search products

## ✅ Testing Locally

1. Start the development server:
```bash
npm run dev
```

2. Test endpoints:
```bash
curl http://localhost:3000/api/product
curl http://localhost:3000/search?keyword=shirt
curl http://localhost:3000/
curl http://localhost:3000/find
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Port 3000 already in use**:
   ```bash
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. **404 Errors**:
   - Ensure `vercel.json` filename is correct (not `vercal.json`)
   - Check that all routes are handled by Express server

3. **Express 5 Compatibility**:
   - Use Express 4.18.2 for stability

## 📝 Notes

- The application uses server-side rendering with Express
- Static files are served from `client/public/`
- All API routes are handled by Express
- Client-side routing is handled by serving index.html for all unmatched routes

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Deployment Guide](https://vercel.com/guides/deploying-nodejs-with-vercel)
