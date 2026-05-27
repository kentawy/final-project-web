const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'Ім’я є обов’язковим',
        'any.required': 'Ім’я є обов’язковим'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Невалідний формат email',
        'string.empty': 'Email є обов’язковим',
        'any.required': 'Email є обов’язковим'
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': 'Пароль має містити мінімум 8 символів',
        'string.empty': 'Пароль є обов’язковим',
        'any.required': 'Пароль є обов’язковим'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Паролі не збігаються',
        'string.empty': 'Підтвердження пароля є обов’язковим',
        'any.required': 'Підтвердження пароля є обов’язковим'
    }),
    role: Joi.string().valid('user', 'admin')
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Невалідний формат email',
        'string.empty': 'Email є обов’язковим',
        'any.required': 'Email є обов’язковим'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Пароль є обов’язковим',
        'any.required': 'Пароль є обов’язковим'
    })
});

module.exports = {
    registerSchema,
    loginSchema
};