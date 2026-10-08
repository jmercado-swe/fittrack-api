const express = require('express');
const router = express.Router();
const progressLogsController = require('../controllers/progressLogsController');
const { isLoggedIn } = require('../middleware/auth');

router.get('/', progressLogsController.getAllProgressLogs);
router.get('/findByUser/:userId', progressLogsController.getProgressLogsByUser);
router.get('/:id', progressLogsController.getProgressLogById);

router.post('/', isLoggedIn, async (req, res) => {
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            userId: "string",
            date: "string",
            weightKg: 0,
            bodyFatPercentage: 0,
            notes: "string"
        }
    }
    */
    progressLogsController.createProgressLog(req, res);
});

router.put('/:id', isLoggedIn, async (req, res) => {
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            userId: "string",
            date: "string",
            weightKg: 0,
            bodyFatPercentage: 0,
            notes: "string"
        }
    }
    */
    progressLogsController.updateProgressLog(req, res);
});

router.delete('/:id', progressLogsController.deleteProgressLog);

module.exports = router;
