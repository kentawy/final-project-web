const Joi = require('joi');

const taskSchema = Joi.object({
    title: Joi.string().trim().required().messages({
        'string.empty': 'Назва задачі обов’язкова',
        'any.required': 'Назва задачі обов’язкова'
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Опис задачі обов’язковий',
        'any.required': 'Опис задачі обов’язковий'
    }),
    status: Joi.string().valid('new', 'in-progress', 'completed'),
    priority: Joi.string().valid('low', 'medium', 'high'),
    dueDate: Joi.date().iso().required().messages({
        'date.format': 'Невірний формат дати',
        'any.required': 'Дата виконання обов’язкова'
    })
});

module.exports = {
    taskSchema
};