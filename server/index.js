const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from client/public
app.use(express.static(path.join(__dirname, "../client/public")));

// Use routes
app.use(routes);

// Serve index.html for all other routes (client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/public/index.html"));
});

// Start server only if not in Vercel environment
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

// Export for Vercel serverless functions
module.exports = app;
