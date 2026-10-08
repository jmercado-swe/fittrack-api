const ProgressLog = require('../models/ProgressLog');

const getAllProgressLogs = async (req, res) => {
    try {
        const logs = await ProgressLog.find();
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving progress logs', error: err.message });
    }
};

const getProgressLogById = async (req, res) => {
    try {
        const log = await ProgressLog.findById(req.params.id);
        if (!log) {
            return res.status(404).json({ message: 'Progress log not found' });
        }
        res.status(200).json(log);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid progress log id format' });
        }
        res.status(500).json({ message: 'Error retrieving progress log', error: err.message });
    }
};

const getProgressLogsByUser = async (req, res) => {
    try {
        const logs = await ProgressLog.find({ userId: req.params.userId });
        res.status(200).json(logs);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user id format' });
        }
        res.status(500).json({ message: 'Error retrieving progress logs', error: err.message });
    }
};

const createProgressLog = async (req, res) => {
    try {
        const newLog = new ProgressLog(req.body);
        const savedLog = await newLog.save();
        res.status(201).json({ id: savedLog._id });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid id format in request body' });
        }
        res.status(500).json({ message: 'Error creating progress log', error: err.message });
    }
};

const updateProgressLog = async (req, res) => {
    try {
        const log = await ProgressLog.findById(req.params.id);
        if (!log) {
            return res.status(404).json({ message: 'Progress log not found' });
        }

        log.userId = req.body.userId;
        log.date = req.body.date;
        log.weightKg = req.body.weightKg;
        log.bodyFatPercentage = req.body.bodyFatPercentage;
        log.notes = req.body.notes;

        await log.save();
        res.status(200).json({ message: 'Progress log updated successfully' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid id format' });
        }
        res.status(500).json({ message: 'Error updating progress log', error: err.message });
    }
};

const deleteProgressLog = async (req, res) => {
    try {
        const log = await ProgressLog.findByIdAndDelete(req.params.id);
        if (!log) {
            return res.status(404).json({ message: 'Progress log not found' });
        }
        res.status(200).json({ message: 'Progress log deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid progress log id format' });
        }
        res.status(500).json({ message: 'Error deleting progress log', error: err.message });
    }
};

module.exports = {
    getAllProgressLogs,
    getProgressLogById,
    getProgressLogsByUser,
    createProgressLog,
    updateProgressLog,
    deleteProgressLog,
};
