app.put('/api/vendor/certify', async (req, res) => {
  const { vendorId, isCertified } = req.body;
  await Vendor.findByIdAndUpdate(vendorId, { isHalalCertified: isCertified });
  res.json({ success: true });
});
