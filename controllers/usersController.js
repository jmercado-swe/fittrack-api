const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users', error: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user id format' });
        }
        res.status(500).json({ message: 'Error retrieving user', error: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json({ id: savedUser._id });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = req.body.name;
        user.email = req.body.email;
        user.age = req.body.age;
        user.weightKg = req.body.weightKg;
        user.heightCm = req.body.heightCm;
        user.fitnessGoal = req.body.fitnessGoal;
        user.activityLevel = req.body.activityLevel;
        user.joinDate = req.body.joinDate;

        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user id format' });
        }
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user id format' });
        }
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
