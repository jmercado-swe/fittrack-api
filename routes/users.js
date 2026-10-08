const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);

router.post('/', async (req, res) => {
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: "string",
            email: "string",
            age: 0,
            weightKg: 0,
            heightCm: 0,
            fitnessGoal: "string",
            activityLevel: "string",
            joinDate: "string"
        }
    }
    */
    usersController.createUser(req, res);
});

router.put('/:id', async (req, res) => {
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: "string",
            email: "string",
            age: 0,
            weightKg: 0,
            heightCm: 0,
            fitnessGoal: "string",
            activityLevel: "string",
            joinDate: "string"
        }
    }
    */
    usersController.updateUser(req, res);
});

router.delete('/:id', usersController.deleteUser);

module.exports = router;
