const express = require('express');
const router = express.Router({ mergeParams: true });
const protect = require('../middleware/protect');
const validateRequest = require('../middleware/validateRequest');
const { createCommentSchema } = require('../validators/commentValidator');
const { getComments, createComment, deleteComment } = require('../controllers/commentController');

router.get('/', getComments);
router.post('/', protect, validateRequest(createCommentSchema), createComment);
router.delete('/:id', protect, deleteComment);

module.exports = router;