const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const submitBtn = document.getElementById('submitBtn');

function validateName() {
    if (nameInput.value.trim().length < 2) {
        setError(nameInput, document.getElementById('nameError'), 'Ім’я має містити мінімум 2 символи');
        return false;
    } else {
        setValid(nameInput, document.getElementById('nameError'));
        return true;
    }
}

function validateEmail() {
    if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
        setError(emailInput, document.getElementById('emailError'), 'Введіть коректний email');
        return false;
    } else {
        setValid(emailInput, document.getElementById('emailError'));
        return true;
    }
}

function validatePassword() {
    if (passwordInput.value.length < 8) {
        setError(passwordInput, document.getElementById('passwordError'), 'Пароль має містити мінімум 8 символів');
        return false;
    } else {
        setValid(passwordInput, document.getElementById('passwordError'));
        if (confirmInput.value.length > 0) validateConfirm();
        return true;
    }
}

function validateConfirm() {
    if (confirmInput.value !== passwordInput.value || confirmInput.value === '') {
        setError(confirmInput, document.getElementById('confirmError'), 'Паролі не збігаються');
        return false;
    } else {
        setValid(confirmInput, document.getElementById('confirmError'));
        return true;
    }
}

function checkFormValidity() {
    const isNameValid = nameInput.value.trim().length >= 2;
    const isEmailValid = emailInput.value.includes('@') && emailInput.value.includes('.');
    const isPasswordValid = passwordInput.value.length >= 8;
    const isConfirmValid = confirmInput.value === passwordInput.value && confirmInput.value !== '';

    submitBtn.disabled = !(isNameValid && isEmailValid && isPasswordValid && isConfirmValid);
}

nameInput.addEventListener('input', () => { validateName(); checkFormValidity(); });
emailInput.addEventListener('input', () => { validateEmail(); checkFormValidity(); });
passwordInput.addEventListener('input', () => { validatePassword(); checkFormValidity(); });
confirmInput.addEventListener('input', () => { validateConfirm(); checkFormValidity(); });

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nValid = validateName();
    const eValid = validateEmail();
    const pValid = validatePassword();
    const cValid = validateConfirm();

    if (!(nValid && eValid && pValid && cValid)) return;

    document.getElementById('serverErrors').innerHTML = '';

    try {
        const response = await fetch('/api/auth/register', { // ВИДАЛЕНО АБСОЛЮТНИЙ URL
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value,
                confirmPassword: confirmInput.value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            displayServerErrors(data, 'serverErrors');
            return;
        }

        window.location.href = '/index.html';
    } catch(err) {
        document.getElementById('serverErrors').innerHTML = `<p>Помилка сервера. Спробуйте пізніше.</p>`;
    }
});