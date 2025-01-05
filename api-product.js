app.get('/api/products', async (req, res) => {
  const { halal } = req.query; // Query parameter
  const products = halal === "true"
    ? await Product.find({ isHalalCertified: true })
    : await Product.find();
  res.json(products);
});
