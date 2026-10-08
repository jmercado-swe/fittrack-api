const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercisesController');

router.get('/', exercisesController.getAllExercises);
router.get('/:id', exercisesController.getExerciseById);

router.post('/', async (req, res) => {
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: "string",
            category: "string",
            muscleGroup: "string",
            equipment: "string",
            difficulty: "string",
            caloriesPerMinute: 0,
            description: "string",
            instructions: "string"
        }
    }
    */
    exercisesController.createExercise(req, res);
});

router.put('/:id', async (req, res) => {
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: "string",
            category: "string",
            muscleGroup: "string",
            equipment: "string",
            difficulty: "string",
            caloriesPerMinute: 0,
            description: "string",
            instructions: "string"
        }
    }
    */
    exercisesController.updateExercise(req, res);
});

router.delete('/:id', exercisesController.deleteExercise);

module.exports = router;
