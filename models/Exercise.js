const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['Cardio', 'Strength', 'Flexibility', 'Balance'],
            message: 'Category must be Cardio, Strength, Flexibility, or Balance',
        },
    },
    muscleGroup: {
        type: String,
        required: [true, 'Muscle group is required'],
        trim: true,
    },
    equipment: {
        type: String,
        required: [true, 'Equipment is required'],
        trim: true,
    },
    difficulty: {
        type: String,
        required: [true, 'Difficulty is required'],
        enum: {
            values: ['Beginner', 'Intermediate', 'Advanced'],
            message: 'Difficulty must be Beginner, Intermediate, or Advanced',
        },
    },
    caloriesPerMinute: {
        type: Number,
        required: [true, 'Calories per minute is required'],
        min: [0, 'Calories per minute must be a positive number'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    instructions: {
        type: String,
        required: [true, 'Instructions are required'],
        trim: true,
    },
});

module.exports = mongoose.model('Exercise', exerciseSchema);
