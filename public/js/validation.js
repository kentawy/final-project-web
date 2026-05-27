function setError(input, errorSpan, message) {
    input.classList.add('error');
    input.classList.remove('valid');
    errorSpan.textContent = message;
}

function setValid(input, errorSpan) {
    input.classList.remove('error');
    input.classList.add('valid');
    errorSpan.textContent = '';
}

function displayServerErrors(data, containerId) {
    const container = document.getElementById(containerId);
    const msgs = data.errors || [data.message];
    container.innerHTML = msgs.map(m => `<p>${m}</p>`).join('');
}