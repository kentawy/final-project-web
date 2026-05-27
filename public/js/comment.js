const params = new URLSearchParams(window.location.search);
const taskId = params.get('taskId');

if (!taskId) {
    window.location.href = '/index.html';
}

const textInput = document.getElementById('text');
const submitBtn = document.getElementById('submitBtn');

function validateComment() {
    let isValid = true;

    if (textInput.value.trim().length < 2) {
        setError(textInput, document.getElementById('textError'), 'Коментар має містити мінімум 2 символи');
        isValid = false;
    } else if (textInput.value.length > 1000) {
         setError(textInput, document.getElementById('textError'), 'Коментар не може перевищувати 1000 символів');
         isValid = false;
    } else {
        setValid(textInput, document.getElementById('textError'));
    }

    submitBtn.disabled = !isValid;
    return isValid;
}

textInput.addEventListener('input', validateComment);

document.getElementById('commentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateComment()) return;

    document.getElementById('serverErrors').innerHTML = '';

    try {
        const response = await fetch(`/api/tasks/${taskId}/comments`, { // ВИДАЛЕНО АБСОЛЮТНИЙ URL
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: textInput.value.trim()
            })
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                 window.location.href = '/login.html';
                 return;
            }
            displayServerErrors(data, 'serverErrors');
            return;
        }

        window.location.href = '/index.html';
    } catch (err) {
         document.getElementById('serverErrors').innerHTML = `<p>Помилка з'єднання з сервером</p>`;
    }
});