const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
