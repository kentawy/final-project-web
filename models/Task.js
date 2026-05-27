const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Назва задачі обов’язкова'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Опис задачі обов’язковий']
    },
    status: {
        type: String,
        enum: ['new', 'in-progress', 'completed'],
        default: 'new'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
        required: [true, 'Дата виконання обов’язкова']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);