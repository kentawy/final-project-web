const Joi = require('joi');

exports.createCommentSchema = Joi.object({
    text: Joi.string().min(2).max(1000).required().messages({
        'string.empty': 'Текст коментаря обов’язковий',
        'string.min': 'Коментар має містити мінімум 2 символи',
        'string.max': 'Коментар не може перевищувати 1000 символів',
        'any.required': 'Текст коментаря обов’язковий'
    })
});