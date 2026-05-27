// Визначаємо поточний URL
const API_URL = window.location.origin;

document.getElementById('createForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const body = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value,
        priority: document.getElementById('priority').value,
        dueDate: document.getElementById('dueDate').value
    };

    try {
        const response = await fetch(`${API_URL}/api/tasks`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            if(response.status === 401) {
                 window.location.href = '/login.html';
                 return;
            }
            document.getElementById('message').textContent = data.message;
            return;
        }

        document.getElementById('message').style.color = 'green';
        document.getElementById('message').textContent = 'Задачу успішно додано!';
        setTimeout(() => window.location.href = '/index.html', 1000);
    } catch (err) {
        document.getElementById('message').textContent = 'Помилка мережі';
    }
});