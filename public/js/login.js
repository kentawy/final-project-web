document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const body = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('/api/auth/login', { // ВИДАЛЕНО АБСОЛЮТНИЙ URL
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            document.getElementById('message').textContent = data.message;
            return;
        }

        window.location.href = '/index.html';
    } catch (err) {
        document.getElementById('message').textContent = 'Помилка мережі';
    }
});