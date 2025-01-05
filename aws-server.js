const express = require('express');
const path = require('path');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Route for serving the frontend app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Payment API endpoint
app.post('/api/payment', async (req, res) => {
  const { amount, currency, description } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe works with smallest currency unit (e.g., cents)
      currency,
      description,
      payment_method_types: ['card'],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listening on the correct port for deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
