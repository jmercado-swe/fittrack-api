const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id is required'],
    },
    exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: [true, 'Exercise id is required'],
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
        match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'],
    },
    durationMinutes: {
        type: Number,
        required: [true, 'Duration (minutes) is required'],
        min: [1, 'Duration must be at least 1 minute'],
    },
    sets: {
        type: Number,
        required: [true, 'Sets is required'],
        min: [1, 'Sets must be at least 1'],
    },
    reps: {
        type: Number,
        required: [true, 'Reps is required'],
        min: [1, 'Reps must be at least 1'],
    },
    caloriesBurned: {
        type: Number,
        required: [true, 'Calories burned is required'],
        min: [0, 'Calories burned must be a positive number'],
    },
    notes: {
        type: String,
        trim: true,
        default: '',
    },
});

module.exports = mongoose.model('Workout', workoutSchema);
