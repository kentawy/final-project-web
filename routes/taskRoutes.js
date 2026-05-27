const express = require('express');
const router = express.Router();
const { getAllTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const protect = require('../middleware/protect');
const restrictTo = require('../middleware/restrictTo');
const validateRequest = require('../middleware/validateRequest');
const { taskSchema } = require('../validators/taskValidator');
const commentRouter = require('./commentRoutes');

router.get('/', getAllTasks);
router.get('/:id', getTask);

router.post('/', protect, validateRequest(taskSchema), createTask);
router.put('/:id', protect, validateRequest(taskSchema), updateTask);
router.delete('/:id', protect, deleteTask);

router.use('/:taskId/comments', commentRouter);

module.exports = router;