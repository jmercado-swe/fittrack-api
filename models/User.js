const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [13, 'Age must be at least 13'],
    },
    weightKg: {
        type: Number,
        required: [true, 'Weight (kg) is required'],
        min: [0, 'Weight must be a positive number'],
    },
    heightCm: {
        type: Number,
        required: [true, 'Height (cm) is required'],
        min: [0, 'Height must be a positive number'],
    },
    fitnessGoal: {
        type: String,
        required: [true, 'Fitness goal is required'],
        enum: {
            values: ['Weight Loss', 'Muscle Gain', 'Endurance', 'General Fitness'],
            message: 'Fitness goal must be Weight Loss, Muscle Gain, Endurance, or General Fitness',
        },
    },
    activityLevel: {
        type: String,
        required: [true, 'Activity level is required'],
        enum: {
            values: ['Sedentary', 'Light', 'Moderate', 'Active', 'Very Active'],
            message: 'Activity level must be Sedentary, Light, Moderate, Active, or Very Active',
        },
    },
    joinDate: {
        type: String,
        required: [true, 'Join date is required'],
        match: [/^\d{4}-\d{2}-\d{2}$/, 'Join date must be in YYYY-MM-DD format'],
    },
});

module.exports = mongoose.model('User', userSchema);
