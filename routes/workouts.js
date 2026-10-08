const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workoutsController');
const { isLoggedIn } = require('../middleware/auth');

router.get('/', workoutsController.getAllWorkouts);
router.get('/findByUser/:userId', workoutsController.getWorkoutsByUser);
router.get('/:id', workoutsController.getWorkoutById);

router.post('/', isLoggedIn, async (req, res) => {
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            userId: "string",
            exerciseId: "string",
            date: "string",
            durationMinutes: 0,
            sets: 0,
            reps: 0,
            caloriesBurned: 0,
            notes: "string"
        }
    }
    */
    workoutsController.createWorkout(req, res);
});

router.put('/:id', isLoggedIn, async (req, res) => {
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            userId: "string",
            exerciseId: "string",
            date: "string",
            durationMinutes: 0,
            sets: 0,
            reps: 0,
            caloriesBurned: 0,
            notes: "string"
        }
    }
    */
    workoutsController.updateWorkout(req, res);
});

router.delete('/:id', workoutsController.deleteWorkout);

module.exports = router;
