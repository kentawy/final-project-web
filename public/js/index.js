// Визначаємо поточний URL
const API_URL = window.location.origin;

async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/api/tasks`, {
            credentials: 'include'
        });
        const data = await response.json();
        
        const list = document.getElementById('taskList');
        
        if (!response.ok) {
            list.innerHTML = `<li>Помилка: ${data.message}</li>`;
            return;
        }

        if (data.data && data.data.length > 0) {
            list.innerHTML = data.data.map(task => 
                `<li>
                    <strong>${task.title}</strong> (${task.status}) - Пріоритет: ${task.priority}<br>
                    <em>${task.description}</em> - До: ${new Date(task.dueDate).toLocaleDateString()}<br>
                    <a href="/comment.html?taskId=${task._id}">Залишити коментар</a>
                </li><br>`
            ).join('');
        } else {
            list.innerHTML = '<li>Задач поки немає.</li>';
        }
    } catch (err) {
        document.getElementById('taskList').innerHTML = '<li>Помилка з\'єднання з сервером.</li>';
    }
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        window.location.href = '/login.html';
    } catch (err) {
        console.error('Помилка при виході:', err);
    }
});

loadTasks();