const Task = require('../models/Task');
const AppError = require('../utils/AppError');

exports.getAllTasks = async (query = {}) => {
    const filter = {};
    if (query.status) {
        filter.status = query.status;
    }
    if (query.priority) {
        filter.priority = query.priority;
    }

    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const tasks = await Task.find(filter)
        .populate('createdBy', 'name email')
        .skip(skip)
        .limit(limit);

    return tasks;
};

exports.getTaskById = async (id) => {
    const task = await Task.findById(id).populate('createdBy', 'name email');
    if (!task) throw new AppError('Задачу не знайдено', 404);
    return task;
};

exports.createTask = async (data, userId) => {
    return await Task.create({ ...data, createdBy: userId });
};

exports.updateTask = async (id, data, currentUser) => {
    const task = await Task.findById(id);
    if (!task) throw new AppError('Задачу не знайдено', 404);

    if (
        task.createdBy.toString() !== currentUser._id.toString() &&
        currentUser.role !== 'admin'
    ) {
        throw new AppError('Ви не маєте прав редагувати цей запис', 403);
    }

    Object.assign(task, data);
    await task.save();
    return task;
};

exports.deleteTask = async (id, currentUser) => {
    const task = await Task.findById(id);
    if (!task) throw new AppError('Задачу не знайдено', 404);

    if (
        task.createdBy.toString() !== currentUser._id.toString() &&
        currentUser.role !== 'admin'
    ) {
        throw new AppError('Ви не маєте прав видаляти цей запис', 403);
    }

    await Task.findByIdAndDelete(id);
    return task;
};