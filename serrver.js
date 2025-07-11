// server.js - Main backend server for WomenCare application

const axios = require("axios");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
});
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        return extname && mimetype ? cb(null, true) : cb(new Error('Only images and PDF files are allowed'));
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/womencare', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => console.log('Connected to MongoDB successfully'));

// Schemas and Models
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String },
    profilePicture: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    preferences: {
        notifications: { type: Boolean, default: true },
        reminders: { type: Boolean, default: true },
        newsletter: { type: Boolean, default: false }
    }
});
const User = mongoose.model('User', userSchema);

const assessmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sessionId: { type: String },
    answers: [{
        questionId: { type: Number, required: true },
        question: { type: String, required: true },
        selectedOption: { type: String, required: true },
        value: { type: Number, required: true }
    }],
    totalScore: { type: Number, required: true },
    riskLevel: { type: String, enum: ['low', 'moderate', 'high'], required: true },
    recommendations: { type: String, required: true },
    completedAt: { type: Date, default: Date.now },
    followUpScheduled: { type: Date },
    doctorReferred: { type: Boolean, default: false }
});
const Assessment = mongoose.model('Assessment', assessmentSchema);

const chatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sessionId: { type: String },
    messages: [{
        sender: { type: String, enum: ['user', 'bot'], required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        category: { type: String },
        sentiment: { type: String, enum: ['positive', 'neutral', 'negative', 'urgent'] }
    }],
    isActive: { type: Boolean, default: true },
    startedAt: { type: Date, default: Date.now },
    lastMessageAt: { type: Date, default: Date.now }
});
const Chat = mongoose.model('Chat', chatSchema);

const cycleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    cycleLength: { type: Number },
    flowIntensity: { type: String, enum: ['light', 'normal', 'heavy'] },
    symptoms: [{ symptom: String, severity: Number, date: Date }],
    mood: [{ mood: String, intensity: Number, date: Date }],
    notes: { type: String },
    predictions: {
        nextPeriod: { type: Date },
        ovulation: { type: Date },
        fertilityWindow: {
            start: { type: Date },
            end: { type: Date }
        }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const Cycle = mongoose.model('Cycle', cycleSchema);

const healthTipSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ['pcod', 'menstrual', 'nutrition', 'exercise', 'mental-health'], required: true },
    tags: [{ type: String }],
    author: { type: String, default: 'WomenCare Team' },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
});
const HealthTip = mongoose.model('HealthTip', healthTipSchema);

const referralSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' },
    doctorName: { type: String, required: true },
    specialty: { type: String, required: true },
    hospitalName: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    urgencyLevel: { type: String, enum: ['routine', 'moderate', 'urgent'], required: true },
    appointmentBooked: { type: Boolean, default: false },
    appointmentDate: { type: Date },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now }
});
const Referral = mongoose.model('Referral', referralSchema);

// Auth middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access token required' });
    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// Email setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
};

const generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
const generateVerificationToken = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

// GPT response utility
const getGPTResponse = async (userMessage) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a compassionate women's health assistant. Answer clearly and kindly about periods, PCOD, PCOS, menstrual problems, long periods, cramps, diet, emotional symptoms, or when to consult a doctor."
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ],
                temperature: 0.7
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("GPT API error:", error.message);
        return "I'm sorry, I couldn't process your message right now. Please try again later.";
    }
};

// Add routes here (already provided in your original code)...
// Include routes like /api/auth/register, /api/chat/message, etc.

// Static file serving
app.use('/uploads', express.static('uploads'));

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 WomenCare Backend Server running on port ${PORT}`);
    console.log(`📚 API Documentation available at http://localhost:${PORT}/api`);
});

module.exports = app;
