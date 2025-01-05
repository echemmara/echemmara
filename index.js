require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Vendor Schema
const vendorSchema = new mongoose.Schema({
  address: String,
  name: String,
  isHalalCertified: Boolean,
});

const Vendor = mongoose.model('Vendor', vendorSchema);

// API Routes
app.post('/api/vendor', async (req, res) => {
  const { address, name, isHalalCertified } = req.body;
  const newVendor = new Vendor({ address, name, isHalalCertified });
  await newVendor.save();
  res.json({ success: true, vendor: newVendor });
});

app.get('/api/vendors', async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
