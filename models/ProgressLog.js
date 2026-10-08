const mongoose = require('mongoose');

const progressLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id is required'],
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
        match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'],
    },
    weightKg: {
        type: Number,
        required: [true, 'Weight (kg) is required'],
        min: [0, 'Weight must be a positive number'],
    },
    bodyFatPercentage: {
        type: Number,
        min: [0, 'Body fat percentage must be at least 0'],
        max: [100, 'Body fat percentage must be at most 100'],
    },
    notes: {
        type: String,
        trim: true,
        default: '',
    },
});

module.exports = mongoose.model('ProgressLog', progressLogSchema);
