const Workout = require('../models/Workout');

const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving workouts', error: err.message });
    }
};

const getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid workout id format' });
        }
        res.status(500).json({ message: 'Error retrieving workout', error: err.message });
    }
};

const getWorkoutsByUser = async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.params.userId });
        res.status(200).json(workouts);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user id format' });
        }
        res.status(500).json({ message: 'Error retrieving workouts', error: err.message });
    }
};

const createWorkout = async (req, res) => {
    try {
        const newWorkout = new Workout(req.body);
        const savedWorkout = await newWorkout.save();
        res.status(201).json({ id: savedWorkout._id });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid id format in request body' });
        }
        res.status(500).json({ message: 'Error creating workout', error: err.message });
    }
};

const updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        workout.userId = req.body.userId;
        workout.exerciseId = req.body.exerciseId;
        workout.date = req.body.date;
        workout.durationMinutes = req.body.durationMinutes;
        workout.sets = req.body.sets;
        workout.reps = req.body.reps;
        workout.caloriesBurned = req.body.caloriesBurned;
        workout.notes = req.body.notes;

        await workout.save();
        res.status(200).json({ message: 'Workout updated successfully' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid id format' });
        }
        res.status(500).json({ message: 'Error updating workout', error: err.message });
    }
};

const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid workout id format' });
        }
        res.status(500).json({ message: 'Error deleting workout', error: err.message });
    }
};

module.exports = {
    getAllWorkouts,
    getWorkoutById,
    getWorkoutsByUser,
    createWorkout,
    updateWorkout,
    deleteWorkout,
};
