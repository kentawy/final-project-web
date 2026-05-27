require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const AppError = require('./utils/AppError');

const app = express();

// 1. БЕЗПЕКА (Security HTTP headers)
app.use(helmet());

// 2. CORS (Cross-Origin Resource Sharing)
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5500',
    credentials: true
}));

// 3. ЛОГУВАННЯ ЗАПИТІВ (Logging)
// В development - короткі логи (dev), в production - загальні стандартні логи (combined)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// 4. ПАРСИНГ ДАНИХ ТА СТАТИКА
app.use(express.static('public')); // Роздача статичних файлів клієнта
app.use(express.json());           // Парсинг JSON в тілі запиту
app.use(cookieParser());           // Парсинг cookie

// 5. МАРШРУТИ (Routes)
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// 6. ОБРОБКА НЕІСНУЮЧИХ МАРШРУТІВ (404)
app.use((req, res, next) => {
    next(new AppError(`Маршрут ${req.originalUrl} не знайдено`, 404));
});

// 7. ГЛОБАЛЬНИЙ ОБРОБНИК ПОМИЛОК (Global Error Handler)
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    
    const response = {
        success: false,
        message: err.message || 'Внутрішня помилка сервера'
    };

    // Детальна інформація (stack trace) тільки для режиму розробки
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    res.status(err.statusCode).json(response);
});

// Підключення до БД та запуск сервера
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
        });
    })
    .catch(err => console.error('Database connection error:', err));