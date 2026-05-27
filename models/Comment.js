const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Текст коментаря обов’язковий'],
        trim: true,
        minlength: [2, 'Коментар має містити мінімум 2 символи'],
        maxlength: [1000, 'Коментар не може перевищувати 1000 символів']
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

commentSchema.index({ task: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Comment', commentSchema);