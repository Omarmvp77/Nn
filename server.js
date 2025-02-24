const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const VisitorSchema = new mongoose.Schema({
    ip: String,
    country: String,
    city: String,
    region: String,
    isp: String,
    userAgent: String,
    referrer: String,
    timestamp: { type: Date, default: Date.now }
});

const Visitor = mongoose.model('Visitor', VisitorSchema);

app.post('/track', async (req, res) => {
    const visitor = new Visitor(req.body);
    await visitor.save();
    res.send({ message: 'تم تسجيل الزيارة بنجاح' });
});

app.get('/visitors', async (req, res) => {
    const visitors = await Visitor.find();
    res.json(visitors);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));