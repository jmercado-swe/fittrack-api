const Exercise = require('../models/Exercise');

const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json(exercises);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving exercises', error: err.message });
    }
};

const getExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(200).json(exercise);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid exercise id format' });
        }
        res.status(500).json({ message: 'Error retrieving exercise', error: err.message });
    }
};

const createExercise = async (req, res) => {
    try {
        const newExercise = new Exercise(req.body);
        const savedExercise = await newExercise.save();
        res.status(201).json({ id: savedExercise._id });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }
        res.status(500).json({ message: 'Error creating exercise', error: err.message });
    }
};

const updateExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        exercise.name = req.body.name;
        exercise.category = req.body.category;
        exercise.muscleGroup = req.body.muscleGroup;
        exercise.equipment = req.body.equipment;
        exercise.difficulty = req.body.difficulty;
        exercise.caloriesPerMinute = req.body.caloriesPerMinute;
        exercise.description = req.body.description;
        exercise.instructions = req.body.instructions;

        await exercise.save();
        res.status(200).json({ message: 'Exercise updated successfully' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid exercise id format' });
        }
        res.status(500).json({ message: 'Error updating exercise', error: err.message });
    }
};

const deleteExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid exercise id format' });
        }
        res.status(500).json({ message: 'Error deleting exercise', error: err.message });
    }
};

module.exports = {
    getAllExercises,
    getExerciseById,
    createExercise,
    updateExercise,
    deleteExercise,
};
